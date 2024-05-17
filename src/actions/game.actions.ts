'use server'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { AI_USER_ID, generateAIShips, getShotsByUser } from '@/lib/battlefield'
import { getRedisKey } from '@/lib/game'
import { redis } from '@/lib/redis'
import { getGameId, getUser, User } from '@/lib/user'
import {
  GameState,
  Position,
  Ships,
  ShipValue,
  Shot,
  Shots,
  ShotValue,
} from '@/types'

export async function startGameAction({
  game,
  ships,
}: {
  game: GameState
  ships: ShipValue[]
}) {
  const user = getUser()
  const aiShips = generateAIShips(game)
  try {
    await Promise.all([
      redis.hset(getRedisKey(game.id, user.id), game),
      redis.set(getRedisKey(game.id, user.id, 'ships'), ships),
      redis.set(getRedisKey(game.id, user.id, 'ai'), aiShips),
    ])
    // save game id in cookies
    cookies().set('game-id', game.id)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to start game. Please try again later.')
  }
  // redirect must be called outside of try/catch
  redirect('/playground')
}

function makeHit({
  userId,
  ships,
  position,
}: {
  userId: string
  ships: Array<ShipValue>
  position: Position
}) {
  let hit: ShotValue = 'missed'
  const newAIShips = ships.map((ship) => {
    if (
      ship.positions.some(
        (pos) => pos.row === position.row && pos.col === position.col,
      )
    ) {
      hit = 'hit'
      return {
        ...ship,
        hits: ship.hits ? [...ship.hits, position] : [position],
      }
    }
    return ship
  })
  const newShot: Shot = {
    user: userId,
    position,
    hit,
    timestamp: Date.now(),
  }

  return { ships: newAIShips, shot: newShot }
}

/**
 * Make a random position for the AI to hit
 */
function makeRandomPosition({ shots }: { shots: Shots }): Position {
  const row = Math.floor(Math.random() * 10)
  const col = Math.floor(Math.random() * 10)
  const position = { row, col }
  if (
    shots.some((shot) => shot.position.row === row && shot.position.col === col)
  ) {
    return makeRandomPosition({ shots })
  }
  return position
}

export async function hitAction({ position }: { position: Position }) {
  const user = getUser()
  const gameId = getGameId()
  const aiShips: Ships | null = await redis.get(
    getRedisKey(gameId, user.id, 'ai'),
  )
  const myShips: Ships | null = await redis.get(
    getRedisKey(gameId, user.id, 'ships'),
  )
  if (!myShips || !aiShips) {
    throw new Error('Something went wrong. Please try again later.')
  }

  const myShot = makeHit({ userId: user.id, position, ships: aiShips })
  await redis.lpush(getRedisKey(gameId, user.id, 'shots'), myShot.shot)
  await redis.set(getRedisKey(gameId, user.id, 'ai'), myShot.ships)
  const randomPosition = makeRandomPosition({
    shots: getShotsByUser({
      shots: await redis.lrange(getRedisKey(gameId, user.id, 'shots'), 0, -1),
      userId: AI_USER_ID,
    }),
  })
  const aiShot = makeHit({
    userId: AI_USER_ID,
    position: randomPosition,
    ships: myShips,
  })
  await redis.lpush(getRedisKey(gameId, user.id, 'shots'), aiShot.shot)
  await redis.set(getRedisKey(gameId, user.id, 'ships'), aiShot.ships)
  revalidatePath('/')
}

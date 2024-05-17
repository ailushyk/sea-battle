import { notFound } from 'next/navigation'

import { AI_USER_ID, generateGridView, getShotsByUser } from '@/lib/battlefield'
import { getRedisKey } from '@/lib/game'
import { redis } from '@/lib/redis'
import { getGameId, getUser } from '@/lib/user'
import { hitAction } from '@/actions/game.actions'
import {
  BattleField,
  BattleFieldBody,
  BattleFieldCell,
  BattleFieldColsHeader,
  BattleFieldGap,
  BattleFieldRow,
  BattleFieldRowHeader,
} from '@/components/battle-field'
import { Sea } from '@/components/sea'
import { GameState, Ships, Shots } from '@/types'

export const revalidate = 0

const battlefieldConfig = {
  rows: 10,
  cols: 10,
}

export default async function Page() {
  const user = getUser()
  const gameId = getGameId()

  if (!gameId) {
    notFound()
  }

  const game: GameState | null = await redis.hgetall(
    getRedisKey(gameId, user.id),
  )
  const myShips: Ships | null = await redis.get(
    getRedisKey(gameId, user.id, 'ships'),
  )
  const aiShips: Ships | null = await redis.get(
    getRedisKey(gameId, user.id, 'ai'),
  )
  const shots: Shots = await redis.lrange(
    getRedisKey(gameId, user.id, 'shots'),
    0,
    -1,
  )

  if (!game || !myShips || !aiShips) {
    notFound()
  }

  const grid = generateGridView({
    game,
    ships: myShips,
    shots: getShotsByUser({
      shots,
      userId: AI_USER_ID,
    }),
  })
  const aiGrid = generateGridView({
    game,
    ships: aiShips,
    shots: getShotsByUser({
      shots,
      userId: user.id,
    }),
  })

  return (
    <div className="container max-w-4xl">
      <h1>Playground</h1>
      <Sea>
        <BattleField>
          <BattleFieldColsHeader cols={game.cols} />
          {grid.map((cells, row) => (
            <BattleFieldRow key={`row-${row}`}>
              <BattleFieldRowHeader row={row} />
              <BattleFieldBody>
                {cells.map((cell, _col) => (
                  <div key={cell.id} className="relative">
                    <BattleFieldCell cell={cell} />
                  </div>
                ))}
              </BattleFieldBody>
            </BattleFieldRow>
          ))}
        </BattleField>

        <BattleFieldGap game={game} />

        <BattleField>
          <BattleFieldColsHeader cols={game.cols} align="left" />
          {aiGrid.map((cells, row) => (
            <BattleFieldRow key={`row-${row}`}>
              <BattleFieldBody>
                {cells.map((cell, _col) => (
                  <div key={cell.id} className="relative">
                    <BattleFieldCell
                      cell={cell}
                      hide={true}
                      onClick={hitAction}
                    />
                  </div>
                ))}
              </BattleFieldBody>
              <BattleFieldRowHeader row={row} />
            </BattleFieldRow>
          ))}
        </BattleField>
      </Sea>
    </div>
  )
}

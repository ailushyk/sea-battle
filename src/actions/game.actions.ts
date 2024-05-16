'use server'

import { revalidatePath } from 'next/cache'
import { v4 } from 'uuid'

import {
  battlefieldConfig,
  generateRandomGrid,
  hitCell,
} from '@/lib/battlefield'
import { getGameKey } from '@/lib/game'
import { redis } from '@/lib/redis'
import { getUser } from '@/lib/user'
import { Cell, Game, Grid, Position } from '@/types'

const GRID_KEY = 'grid'
const AI_GRID_KEY = 'aiGrid'

export async function startGameAction({ grid }: { grid: Cell[][] }) {
  const user = getUser()
  const gameId = v4()
  const newGame: Game = {
    id: gameId,
    status: 'setting-up',
    players: [],
    hits: [],
    [GRID_KEY]: grid,
    [AI_GRID_KEY]: generateRandomGrid(battlefieldConfig),
  }
  await redis.hset(getGameKey({ user }), newGame)
}

export async function hitAction({ position }: { position: Position }) {
  const user = getUser()
  const grid: Grid | null = await redis.hget(getGameKey({ user }), AI_GRID_KEY)
  if (!grid) {
    throw new Error('Game not found')
  }
  const _grid = hitCell(grid, position)
  await redis.hset(getGameKey({ user }), { [AI_GRID_KEY]: _grid })
  revalidatePath('/')
}

export async function generateAIGridAction() {
  console.log('generateAIGrid')
}

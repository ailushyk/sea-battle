'use server'

import { redirect } from 'next/navigation'

import { gameService } from '@/services/game.service'
import { Coordinate, Shots } from '@/types'

export const createGameAction = async () => {
  const game = await gameService.createGame()
  redirect(`/games/${game.id}/setup`)
}

/**
 * Make a random position for the AI to hit
 */
function makeRandomPosition({ shots }: { shots: Shots }): Coordinate {
  const row = Math.floor(Math.random() * 10)
  const col = Math.floor(Math.random() * 10)
  const position = { row, col }
  if (
    shots.some(
      (shot) => shot.coordinate.row === row && shot.coordinate.col === col,
    )
  ) {
    return makeRandomPosition({ shots })
  }
  return position
}

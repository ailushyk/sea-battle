import { notFound } from 'next/navigation'

import { battlefieldConfig, generateRandomGrid } from '@/lib/battlefield'
import { getGameKey } from '@/lib/game'
import { redis } from '@/lib/redis'
import { getUser } from '@/lib/user'
import { hitAction } from '@/actions/game.actions'
import { BattleField } from '@/components/battle-field'
import { Sea } from '@/components/sea'
import { Cell } from '@/types'

export const revalidate = 0

export default async function Page() {
  const user = getUser()
  const grid: Cell[][] | null = await redis.hget(getGameKey({ user }), 'grid')
  const aiGrid: Cell[][] | null = await redis.hget(
    getGameKey({ user }),
    'aiGrid',
  )

  if (!grid || !aiGrid) {
    notFound()
  }

  return (
    <div className="container max-w-4xl">
      <h1>Playground</h1>
      <Sea>
        <BattleField grid={grid} />
        <div className="flex flex-1 flex-col">
          {Array.from({ length: battlefieldConfig.rows + 1 }).map((_, i) => (
            <div
              key={`row-${i}`}
              className="h-8 w-full flex-1 border-y border-border/50 first:border-transparent"
            />
          ))}
        </div>
        <BattleField grid={aiGrid} hideShips={false} onClick={hitAction} />
      </Sea>
    </div>
  )
}

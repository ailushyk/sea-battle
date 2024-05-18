import { cookies } from 'next/headers'
import { v4 } from 'uuid'

import { getRedisKey } from '@/lib/game'
import { redis } from '@/lib/redis'
import { getUser } from '@/lib/user'
import { AvailableShips } from '@/components/setting-up/available-ships'
import { PreviewSelectedShip } from '@/components/setting-up/preview-selected-ship'
import { SettingUpField } from '@/components/setting-up/setting-up-field'
import { SettingUpProvider } from '@/components/setting-up/setting-up-provider'
import { GameState, Ships } from '@/types'

function createGame({
  userId,
  gameId,
}: {
  userId: string
  gameId?: string
}): GameState {
  return {
    id: gameId || v4(),
    players: [userId],
    rows: 10, // 10x10 grid, 100 cells, 5 ships
    cols: 10, // In the future, we can have different grid sizes
    status: 'setting-up',
    timestamp: Date.now(),
  }
}

export default async function Page() {
  let initShips: Ships = []
  const user = getUser()
  const gameId = cookies().get('game-id')?.value
  if (gameId) {
    const lastGame = await redis.hget(getRedisKey(gameId, user.id), 'status')
    if (lastGame === 'setting-up') {
      initShips = (await redis.get(getRedisKey(gameId, user.id, 'ships'))) || []
    }
  }
  const game = createGame({ userId: user.id, gameId })

  return (
    <SettingUpProvider game={game} initShips={initShips}>
      <div className="container max-w-lg">
        <h1>Start</h1>
        <div className="space-y-8">
          <h1>Ships</h1>

          <div className="grid grid-cols-2 gap-4">
            <AvailableShips />
            <PreviewSelectedShip />
          </div>

          <SettingUpField />
        </div>
      </div>
    </SettingUpProvider>
  )
}

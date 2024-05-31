import { auth } from '@/lib/auth'
import { getShipCoordinates } from '@/lib/ship-utils'
import { makeApiRequest } from '@/services/api-service'
import { GameState, Orientation, Ships, ShipValue } from '@/types'

type GameStateResponse = {
  id: string
  gameId: string
  userId: string
  size: number
  orientation: Orientation
  row: number
  col: number
  status: 'idle' | 'started' | 'finished'
}

const defaultOptions = {
  rows: 10,
  cols: 10,
}

function createGameService() {
  return {
    async createGame(params?: {
      rows?: number
      cols?: number
    }): Promise<GameState> {
      return await makeApiRequest('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth()?.accessToken}`,
        },
        body: JSON.stringify({ ...defaultOptions, ...params }),
      })
    },
    async get({ gameId }: { gameId: string }): Promise<GameState | null> {
      return await makeApiRequest(`/api/games/${gameId}`, {
        headers: {
          Authorization: `Bearer ${auth()?.accessToken}`,
        },
      })
    },

    async getShips({ gameId }: { gameId: string }) {
      const response = await makeApiRequest(`/api/games/${gameId}/ships`, {
        headers: {
          Authorization: `Bearer ${auth()?.accessToken}`,
        },
      })

      const ships: Ships = response.map((ship: GameStateResponse) => ({
        ...ship,
        coordinates: getShipCoordinates({
          orientation: ship.orientation,
          size: ship.size,
          coordinate: {
            row: ship.row,
            col: ship.col,
          },
        }),
      }))
      return ships
    },
  }
}

export const gameService = createGameService()

import { cookies } from 'next/headers'

import { User } from '@/lib/user'
import { Orientation, ShipType, ShipValue } from '@/types'

export const availableShips: ShipValue[] = [
  {
    id: 'carrier',
    type: ShipType.Carrier,
    size: ShipType.Carrier,
    orientation: Orientation.Horizontal,
    positions: [],
  },
  {
    id: 'battleship',
    type: ShipType.Battleship,
    size: ShipType.Battleship,
    orientation: Orientation.Horizontal,
    positions: [],
  },
  {
    id: 'cruiser',
    type: ShipType.Cruiser,
    size: ShipType.Cruiser,
    orientation: Orientation.Horizontal,
    positions: [],
  },
  {
    id: 'submarine',
    type: ShipType.Submarine,
    size: ShipType.Submarine,
    orientation: Orientation.Horizontal,
    positions: [],
  },
  {
    id: 'destroyer',
    type: ShipType.Destroyer,
    size: ShipType.Destroyer,
    orientation: Orientation.Horizontal,
    positions: [],
  },
]

export const getGameKey = ({ user }: { user: User }, subKey?: string) => {
  //TODO: use game id instead of user id
  const key = `sb:game:${user.id}`
  return subKey ? `${key}:${subKey}` : key
}

export function getRedisKey(
  gameId: string,
  userId: string,
  subKey?: 'ships' | 'ai' | 'shots',
): string {
  const key = `${gameId}:${userId}`
  return subKey ? `${key}:${subKey}` : key
}

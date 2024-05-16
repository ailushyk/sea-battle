import { User } from '@/lib/user'
import { Cell, Orientation, Position, ShipType, ShipValue } from '@/types'

export const ships: ShipValue[] = [
  {
    id: 'carrier',
    type: ShipType.Carrier,
    size: ShipType.Carrier,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'battleship',
    type: ShipType.Battleship,
    size: ShipType.Battleship,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'cruiser',
    type: ShipType.Cruiser,
    size: ShipType.Cruiser,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'submarine',
    type: ShipType.Submarine,
    size: ShipType.Submarine,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'destroyer',
    type: ShipType.Destroyer,
    size: ShipType.Destroyer,
    orientation: Orientation.Horizontal,
  },
]

export const getGameKey = ({ user }: { user: User }, subKey?: string) => {
  //TODO: use game id instead of user id
  const key = `sb:game:${user.id}`
  return subKey ? `${key}:${subKey}` : key
}

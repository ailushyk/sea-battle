import { availableShips, getGameKey } from '@/lib/game'
import { User } from '@/lib/user'
import { Orientation, ShipType } from '@/types'

describe('game.actions.ts', () => {
  it('has correct ships array', () => {
    expect(availableShips).toEqual([
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
    ])
  })

  it('getGameKey returns correct key', () => {
    const user: User = { id: '123' }
    const subKey = 'subKeyTest'

    expect(getGameKey({ user })).toBe(`sb:game:${user.id}`)
    expect(getGameKey({ user }, subKey)).toBe(`sb:game:${user.id}:${subKey}`)
  })
})

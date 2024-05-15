import { Orientation, Position, ships, ShipType } from '@/lib/game'
import { getCellId } from '@/lib/ship-utils'

describe('game.ts', () => {
  it('has correct ship types', () => {
    expect(ShipType.Carrier).toBe(5)
    expect(ShipType.Battleship).toBe(4)
    expect(ShipType.Cruiser).toBe(3)
    expect(ShipType.Submarine).toBe(3)
    expect(ShipType.Destroyer).toBe(2)
  })

  it('has correct ships array', () => {
    expect(ships).toEqual([
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

  it('getCellId returns correct id', () => {
    const position: Position = {
      row: 2,
      col: 3,
    }
    const id = getCellId(position)
    expect(id).toBe('2-3')
  })

  it('getCellId returns uncorrect id', () => {
    const position: Position = {
      row: 2,
      col: 3,
    }
    const id = getCellId(position)
    expect(id).not.toBe('3-3')
  })

  it('Cell has correct id', () => {
    const position = {
      row: 3,
      col: 5,
    }
    const cell = {
      id: getCellId(position),
      ship: null,
      hit: null,
      position,
    }
    expect(cell.id).toBe('3-5')
  })
})

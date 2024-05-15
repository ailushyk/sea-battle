import {
  createHorizontalBattleship,
  createVerticalBattleship,
} from '@/lib/__tests__/battlefield.test'
import { addShipToGrid, initBattlefield } from '@/lib/battlefield'
import { Cell, Orientation, Position, ShipType, ShipValue } from '@/lib/game'
import { validateShipPosition } from '@/lib/validate-field'

describe('validateField', () => {
  const grid = initBattlefield(10, 10)

  it('Success when a ship can be placed horizontally within the grid', () => {
    const ship = createHorizontalBattleship()
    const position: Position = {
      row: 0,
      col: 0,
    }
    expect(validateShipPosition({ grid, ship, position })).toBe(true)
  })

  it('Fail when a ship cannot be placed horizontally within the grid', () => {
    const ship = createVerticalBattleship()
    const position: Position = {
      row: 8,
      col: 0,
    }
    expect(
      validateShipPosition({
        grid,
        ship,
        position,
      }),
    ).toBe(false)
  })

  it('Success when a ship can be placed vertically within the grid', () => {
    const ship = createVerticalBattleship()
    const position: Position = {
      row: 0,
      col: 0,
    }
    const result = validateShipPosition({ grid, ship, position })
    expect(result).toBe(true)
  })

  it('Fail when a ship cannot be placed vertically within the grid', () => {
    const shipVertical = createVerticalBattleship()
    const position: Position = {
      row: 8,
      col: 0,
    }
    const result = validateShipPosition({
      grid,
      ship: shipVertical,
      position,
    })
    expect(result).toBe(false)
  })

  it('Fail when the cell already has a ship', () => {
    const ship = createVerticalBattleship()
    const position = {
      row: 0,
      col: 0,
    }
    const gridWithShip = initBattlefield(10, 10).map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        if (rowIndex === 0 && colIndex < 5) {
          return {
            ...cell,
            ship: 'n',
          }
        }
        return cell
      })
    })
    const result = validateShipPosition({ grid: gridWithShip, ship, position })
    expect(result).toBe(false)
  })
})

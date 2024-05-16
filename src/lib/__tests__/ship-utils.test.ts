import {
  createHorizontalBattleship,
  createVerticalBattleship,
} from '@/lib/__tests__/battlefield.test'
import { initBattlefield } from '@/lib/battlefield'
import {
  getCellId,
  getShipCellIds,
  validateShipPosition,
} from '@/lib/ship-utils'
import { Position } from '@/types'

describe('ship-utils', () => {
  it('Create a cell id from position', () => {
    expect(getCellId({ row: 3, col: 5 })).toBe('3-5')
  })
  it("Return an array of cells's ids for a horizontal ship", () => {
    const ship = createHorizontalBattleship()
    const position = { row: 0, col: 0 }
    const result = getShipCellIds(ship, position)
    expect(['0-0', '0-1', '0-2', '0-3']).toEqual(result)
  })
  it("Return an array of cells's ids for a vertical ship", () => {
    const ship = createVerticalBattleship()
    const position = { row: 0, col: 0 }
    const result = getShipCellIds(ship, position)
    expect(['0-0', '1-0', '2-0', '3-0']).toEqual(result)
  })
})

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

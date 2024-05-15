import {
  createHorizontalBattleship,
  createVerticalBattleship,
} from '@/lib/__tests__/battlefield.test'
import { getCellId, getShipCellIds } from '@/lib/ship-utils'

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

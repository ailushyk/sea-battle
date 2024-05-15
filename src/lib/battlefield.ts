import { Cell, Position, ShipValue } from '@/lib/game'
import { getCellId, getShipCellIds } from '@/lib/ship-utils'
import { validateShipPosition } from '@/lib/validate-field'

export function initBattlefield(rows: number, cols: number): Cell[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      const position = {
        row: row,
        col: col,
      }
      return {
        id: getCellId(position),
        ship: null,
        hit: null,
        position,
      }
    }),
  )
}

export function addShipToGrid({
  grid,
  ship,
  position,
}: {
  grid: Cell[][]
  ship: ShipValue
  position: Position
}) {
  const ids = getShipCellIds(ship, position)
  const validation = validateShipPosition({ grid, ship, position })
  if (!validation) {
    return grid
  }

  return grid.map((row) =>
    row.map((col) => {
      if (ids.includes(col.id)) {
        return {
          ...col,
          ship: ship.id,
          validation: null,
        }
      }
      return col
    }),
  )
}

export function resetGridValidation(grid: Cell[][]) {
  return grid.map((row) =>
    row.map((col) => {
      if (col.validation) {
        return {
          ...col,
          validation: null,
        }
      }
      return col
    }),
  )
}

export function previewShipPosition({
  grid,
  ship,
  position,
}: {
  grid: Cell[][]
  ship: ShipValue
  position: Position
}): Cell[][] {
  const ids = getShipCellIds(ship, position)
  const validation = validateShipPosition({ grid, ship, position })
  const _grid = resetGridValidation(grid)

  return _grid.map((row) =>
    row.map((col) => {
      if (ids.includes(col.id)) {
        return {
          ...col,
          validation: validation ? 'valid' : 'invalid',
        }
      }
      return { ...col, validation: null }
    }),
  )
}

export function removeShipFromGrid({
  grid,
  ship,
}: {
  grid: Cell[][]
  ship: ShipValue
}) {
  return grid.map((row) =>
    row.map((col) => {
      if (col.ship === ship.id) {
        return {
          ...col,
          ship: null,
          validation: null,
        }
      }
      return col
    }),
  )
}

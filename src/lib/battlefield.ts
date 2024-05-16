import { ships } from '@/lib/game'
import {
  getCellId,
  getShipCellIds,
  validateShipPosition,
} from '@/lib/ship-utils'
import { Cell, Grid, Orientation, Position, ShipValue } from '@/types'

export const battlefieldConfig = {
  rows: 10,
  cols: 10,
}

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

function placeShipOnGrid(grid: Cell[][], ship: ShipValue): Cell[][] {
  for (let i = 0; i < 100; i++) {
    // limit the number of attempts to 100
    const position = {
      row: Math.floor(Math.random() * grid.length),
      col: Math.floor(Math.random() * grid[0].length),
    }
    const validation = validateShipPosition({ grid, ship, position })
    if (validation) {
      return addShipToGrid({ grid, ship, position })
    }
  }
  return grid // return the original grid if the ship couldn't be placed
}

export function generateRandomGrid({
  rows,
  cols,
}: {
  rows: number
  cols: number
}): Cell[][] {
  return ships.reduce(
    (grid, ship) => {
      return placeShipOnGrid(grid, ship)
    },
    initBattlefield(rows, cols),
  )
}

export function hitCell(grid: Grid, position: Position) {
  const cell = grid[position.row][position.col]
  if (cell.ship) {
    grid[position.row][position.col].hit = 'hit'
  } else {
    grid[position.row][position.col].hit = 'miss'
  }
  return grid
}

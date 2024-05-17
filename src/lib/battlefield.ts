import { availableShips } from '@/lib/game'
import {
  getCellId,
  getShipCellIds,
  getShipPositions,
  validateShipPosition,
} from '@/lib/ship-utils'
import {
  Cell,
  GameState,
  Grid,
  Orientation,
  Position,
  Ships,
  ShipValue,
  Shots,
  ShotValue,
} from '@/types'

export const AI_USER_ID = 'ai'

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

export function generateGridView(
  {
    game,
    ships,
    shots,
  }: {
    game: GameState
    ships: Ships
    shots?: Shots
  },
  options?: { ship?: ShipValue; position?: Position },
) {
  // create a grid with ships and shots
  const grid = initBattlefield(game.rows, game.cols)
  ships.forEach((ship) => {
    ship.positions.forEach((position) => {
      const cell = grid[position.row][position.col]
      grid[position.row][position.col] = {
        ...cell,
        ship: ship.id,
      }
    })
  })
  // add shots to the grid
  if (shots) {
    shots.forEach(({ position }) => {
      const cell = grid[position.row][position.col]
      grid[position.row][position.col] = {
        ...cell,
        hit: ships.some((ship) =>
          ship.positions.some(
            (pos) => pos.row === position.row && pos.col === position.col,
          ),
        )
          ? 'hit'
          : 'missed',
      }
    })
  }
  if (options?.ship && options?.position) {
    // validate if the ship can be placed on the grid
    // add a preview of the ship
  }
  return grid
}

export function addPreviewShipPosition({
  grid,
  ship,
  position,
}: {
  grid: Cell[][]
  ship: ShipValue
  position: Position
}): Grid {
  // Get the cell IDs where the ship would be if placed at the given position
  const ids = getShipCellIds(ship, position)
  // Validate if the ship can be placed at the given position
  const validation = validateShipPosition({ grid, ship, position })
  // Reset the validation of the grid
  const _grid = resetGridValidation(grid)

  // Map through the grid and update the cells where the ship would be placed
  return _grid.map((row) =>
    row.map((cell) => {
      if (ids.includes(cell.id)) {
        // If the cell is where the ship would be placed, update its validation
        return {
          ...cell,
          validation: validation ? 'valid' : 'invalid',
        }
      }
      // If the cell is not where the ship would be placed, keep its validation null
      return { ...cell, validation: null }
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

function placeAIShipOnGrid(grid: Grid, ship: ShipValue): ShipValue {
  for (let i = 0; i < 100; i++) {
    const _ship = {
      ...ship,
      orientation:
        Math.random() > 0.5 ? Orientation.Horizontal : Orientation.Vertical,
    }
    // limit the number of attempts to 100
    const position = {
      row: Math.floor(Math.random() * grid.length),
      col: Math.floor(Math.random() * grid[0].length),
    }
    const validation = validateShipPosition({ grid, ship: _ship, position })
    if (validation) {
      return {
        ..._ship,
        positions: getShipPositions(_ship, position),
      }
    }
  }
  return ship // return the original ship if it couldn't be placed
}

export function generateAIShips(game: GameState): Ships {
  return availableShips.reduce((ships: Ships, ship: ShipValue) => {
    const grid = generateGridView({ game, ships })
    const newShip = placeAIShipOnGrid(grid, ship)
    return [...ships, newShip]
  }, [])
}

export function hitCell(grid: Grid, position: Position): ShotValue {
  const cell = grid[position.row][position.col]
  if (cell.ship) {
    return 'hit'
  }
  return 'missed'
}

export function getShotsByUser({
  shots,
  userId,
}: {
  shots: Shots
  userId: string
}) {
  return shots.filter((shot) => shot.user === userId)
}

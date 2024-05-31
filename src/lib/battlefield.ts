import { AVAILABLE_SHIPS } from '@/lib/game'
import {
  getCellId,
  getShipCellIds,
  getShipCoordinates,
  validateShipCoordinates,
} from '@/lib/ship-utils'
import {
  Cell,
  Coordinate,
  GameState,
  Grid,
  Orientation,
  Ships,
  ShipValue,
  Shots,
} from '@/types'

export const AI_USER_ID = 'ai'

export function initBattlefield(rows: number, cols: number): Grid {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => {
      const coordinate = {
        row: row,
        col: col,
      }
      return {
        id: getCellId(coordinate),
        coordinate,
        value: null,
      } satisfies Cell
    }),
  )
}

export function generateGridView({
  game,
  ships,
  shots,
}: {
  game: Pick<GameState, 'rows' | 'cols'>
  ships: Ships
  shots?: Shots
}) {
  // create a grid with ships and shots
  const grid = initBattlefield(game.rows, game.cols)
  ships.forEach((ship) => {
    ship.coordinates?.forEach((coordinate) => {
      const cell = grid[coordinate.row][coordinate.col]
      grid[coordinate.row][coordinate.col] = {
        ...cell,
        value: 'ship',
      }
    })
  })
  // add shots to the grid
  if (shots) {
    shots.forEach(({ coordinate }) => {
      const cell = grid[coordinate.row][coordinate.col]
      grid[coordinate.row][coordinate.col] = {
        ...cell,
        value: cell.value === 'ship' ? 'hit' : 'missed',
      }
    })
  }
  return grid
}

export function addShipToGrid({
  grid,
  ship,
  coordinate,
}: {
  grid: Cell[][]
  ship: ShipValue
  coordinate: Coordinate
}) {
  const ids = getShipCellIds(ship, coordinate)
  const validation = validateShipCoordinates({
    grid,
    ship,
    coordinate: coordinate,
  })
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

/**
 * @deprecated
 */
function placeAIShipOnGrid(grid: Grid, ship: ShipValue): ShipValue {
  for (let i = 0; i < 100; i++) {
    const _ship = {
      ...ship,
      orientation:
        Math.random() > 0.5 ? Orientation.Horizontal : Orientation.Vertical,
    }
    // limit the number of attempts to 100
    const coordinate = {
      row: Math.floor(Math.random() * grid.length),
      col: Math.floor(Math.random() * grid[0].length),
    }
    const validation = validateShipCoordinates({
      grid,
      ship: _ship,
      coordinate,
    })
    if (validation) {
      return {
        ..._ship,
        coordinates: getShipCoordinates({
          orientation: _ship.orientation,
          size: _ship.size,
          coordinate,
        }),
      }
    }
  }
  return ship // return the original ship if it couldn't be placed
}

export function generateAIShips(game: GameState): Ships {
  return AVAILABLE_SHIPS.reduce((ships: Ships, ship: ShipValue) => {
    const grid = generateGridView({ game, ships })
    const newShip = placeAIShipOnGrid(grid, ship)
    return [...ships, newShip]
  }, [])
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

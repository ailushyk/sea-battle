import { Cell, Coordinate, Orientation, ShipValue } from '@/types'

export const getCellId = (position: Coordinate) =>
  `${position.row}-${position.col}`

export function getShipCellIds(currentShip: ShipValue, position: Coordinate) {
  return Array.from({ length: currentShip.size }, (_, i) => {
    if (currentShip.orientation === Orientation.Horizontal) {
      return getCellId({
        row: position.row,
        col: position.col + i,
      })
    }
    return getCellId({
      row: position.row + i,
      col: position.col,
    })
  })
}

export function getShipCoordinates({
  orientation,
  size,
  coordinate,
}: {
  orientation: Orientation
  size: number
  coordinate: Coordinate
}): Coordinate[] {
  return Array.from({ length: size }, (_, i) => {
    if (orientation === Orientation.Horizontal) {
      return {
        row: coordinate.row,
        col: coordinate.col + i,
      }
    }
    return {
      row: coordinate.row + i,
      col: coordinate.col,
    }
  })
}

export function validateShipCoordinates({
  grid,
  ship,
  coordinate,
}: {
  grid: Cell[][]
  ship: ShipValue
  coordinate: Coordinate
}) {
  const ids = getShipCellIds(ship, coordinate)

  return ids.every((id) => {
    const _cell = grid.flat().find((c) => c.id === id)

    if (!_cell) return false

    return !(_cell.value === 'ship')
  })
}

import { Cell, Orientation, Position, ShipValue } from '@/types'

export const getCellId = (position: Position) =>
  `${position.row}-${position.col}`

export function getShipCellIds(currentShip: ShipValue, position: Position) {
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

export function validateShipPosition({
  grid,
  ship,
  position,
}: {
  grid: Cell[][]
  ship: ShipValue
  position: Position
}) {
  const ids = getShipCellIds(ship, position)

  return ids.every((id) => {
    const _cell = grid.flat().find((c) => c.id === id)

    if (!_cell) return false

    return !_cell.ship
  })
}

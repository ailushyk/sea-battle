import { Orientation, Position, ShipValue } from '@/lib/game'

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

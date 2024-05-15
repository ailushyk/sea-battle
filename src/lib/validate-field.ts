import { Cell, Position, ShipValue } from '@/lib/game'
import { getShipCellIds } from '@/lib/ship-utils'

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

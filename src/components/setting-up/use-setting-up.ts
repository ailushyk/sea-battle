import { useState } from 'react'

import {
  addShipToGrid,
  initBattlefield,
  previewShipPosition,
  removeShipFromGrid,
  resetGridValidation,
} from '@/lib/battlefield'
import { Cell, Orientation, Position, ShipValue } from '@/lib/game'
import { validateShipPosition } from '@/lib/validate-field'

export function useSettingUp({ rows, cols }: { rows: number; cols: number }) {
  const [currentShip, setCurrentShip] = useState<ShipValue | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [grid, setGrid] = useState<Cell[][]>(() => initBattlefield(rows, cols))

  function selectCurrentShip(ship: ShipValue) {
    setCurrentShip((prevState) => {
      if (prevState?.id === ship.id) {
        return null
      }
      return ship
    })
  }

  function checkField({ position }: { position: Position }) {
    if (!currentShip || !position) return null
    setGrid((prevState) => {
      return previewShipPosition({
        grid: prevState,
        ship: currentShip,
        position,
      })
    })
  }

  function addShip({ position }: { position: Position }) {
    if (!currentShip) return
    if (!validateShipPosition({ grid, ship: currentShip, position })) return

    setGrid((prevState) => {
      return addShipToGrid({
        grid: prevState,
        ship: currentShip,
        position,
      })
    })
    setSelected((prevState) => [...prevState, currentShip.id])
    setCurrentShip(null)
  }

  function removeShip(ship: ShipValue) {
    setGrid((prevState) => {
      return removeShipFromGrid({ grid: prevState, ship })
    })
    setSelected((prevState) => prevState.filter((id) => id !== ship.id))
  }

  const rotateShip = (ship: ShipValue) => {
    setCurrentShip((prevState) => {
      if (!prevState) return null
      return {
        ...prevState,
        orientation:
          ship.orientation === Orientation.Horizontal
            ? Orientation.Vertical
            : Orientation.Horizontal,
      }
    })
  }

  function reset() {
    setSelected([])
    setCurrentShip(null)
    setGrid(initBattlefield(rows, cols))
  }

  let resetValidation = () => {
    setGrid((prevState) => {
      return resetGridValidation(prevState)
    })
  }

  return {
    grid,
    currentShip,
    selected,
    selectCurrentShip,
    addShip,
    checkField,
    rotateShip,
    removeShip,
    reset,
    resetValidation,
  }
}

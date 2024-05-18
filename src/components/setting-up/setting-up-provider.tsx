'use client'

import { createContext, useContext, useState } from 'react'

import { generateGridView } from '@/lib/battlefield'
import { getShipPositions, validateShipPosition } from '@/lib/ship-utils'
import {
  GameState,
  Grid,
  Orientation,
  Position,
  PositionValidationValue,
  Ships,
  ShipValue,
  ValidatedPosition,
} from '@/types'

interface SettingUpContextType {
  game: GameState
  grid: Grid
  ships: Ships
  currentShip: ShipValue | null

  selectCurrentShip: (ship: ShipValue) => void
  addShip: (params: { position: Position }) => void
  showPreview: (params: { position: Position }) => void
  getPreviewCellValue: (position: Position) => PositionValidationValue
  rotateShip: (ship: ShipValue) => void
  removeShip: (ship: ShipValue) => void
  reset: () => void
  resetValidation: () => void
}

const SettingUpContext = createContext<SettingUpContextType>(null!)

export const useSettingUp = () => {
  const context = useContext(SettingUpContext)
  if (!context) {
    throw new Error('useSettingUp must be used within a SettingUpProvider')
  }
  return context
}

export const SettingUpProvider = ({
  game,
  initShips,
  children,
}: {
  game: GameState
  initShips?: ShipValue[]
  children: React.ReactNode
}) => {
  const value = useSettingUp_deprecated({
    game,
    initShips,
  })

  return (
    <SettingUpContext.Provider value={{ game, ...value }}>
      {children}
    </SettingUpContext.Provider>
  )
}

export function useSettingUp_deprecated({
  game,
  initShips,
}: {
  game: GameState
  initShips?: ShipValue[]
}) {
  const [currentShip, setCurrentShip] = useState<ShipValue | null>(null)
  const [ships, setShips] = useState<ShipValue[]>(initShips || [])
  const [grid, setGrid] = useState<Grid>(() => {
    return generateGridView({ game, ships })
  })
  const [previewShip, setPreviewShip] = useState<ValidatedPosition[] | null>(
    null,
  )

  function selectCurrentShip(ship: ShipValue) {
    setCurrentShip((prevState) => {
      if (prevState?.id === ship.id) {
        return null
      }
      return ship
    })
  }

  function showPreview({ position }: { position: Position }) {
    if (!currentShip || !position) return
    const ship = currentShip
    // Get the cell IDs where the ship would be if placed at the given position
    const positions = getShipPositions(ship, position)
    // Validate if the ship can be placed at the given position
    const validation = validateShipPosition({ grid, ship, position })
    // Reset the validation of the grid
    setPreviewShip(() => {
      return positions.map((pos) => {
        return {
          ...pos,
          valid: validation ? 'valid' : 'invalid',
        } satisfies ValidatedPosition
      })
    })
  }

  function addShip({ position }: { position: Position }) {
    // validate if ship can be placed in the selected position
    if (!currentShip) return
    if (!validateShipPosition({ grid, ship: currentShip, position })) return

    // update ship positions
    const newShip = {
      ...currentShip,
      positions: getShipPositions(currentShip, position),
    }
    const _ships = [...ships, newShip]
    setShips(_ships)

    // generate grid with ships
    const _grid = generateGridView({
      game,
      ships: _ships,
    })
    setGrid(_grid)
    // unselect ship
    setCurrentShip(null)
    setPreviewShip(null)
  }

  function getPreviewCellValue(position: Position): PositionValidationValue {
    if (!currentShip) return null
    return previewShip?.find(
      (p) => p.row === position.row && p.col === position.col,
    )?.valid
  }

  function removeShip(ship: ShipValue) {
    const _ships = ships.filter((s) => s.id !== ship.id)
    setShips(_ships)
    setGrid(generateGridView({ game, ships: _ships }))
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
    setShips([])
    setCurrentShip(null)
    setGrid(generateGridView({ game, ships: [] }))
  }

  let resetValidation = () => {
    setPreviewShip(null)
  }

  return {
    grid,
    currentShip,
    ships,
    previewShip,
    selectCurrentShip,
    addShip,
    getPreviewCellValue,
    showPreview,
    rotateShip,
    removeShip,
    reset,
    resetValidation,
  }
}

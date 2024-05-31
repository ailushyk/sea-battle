'use client'

import React, { createContext, useContext, useState } from 'react'

import { getShipCoordinates } from '@/lib/ship-utils'
import { addShipAction, removeShipAction } from '@/actions/actions'
import { Coordinate, GameState, Orientation, ShipValue } from '@/types'

interface SettingUpContextType {
  game: GameState
  active: ShipValue | null
  ships: ShipValue[]

  select: (ship: ShipValue) => void
  add: (ship: ShipValue, coordinate: Coordinate) => void
  remove: (shipId: string) => void
  rotate: (ship: ShipValue) => void
  validate: (ship: ShipValue, coordinate: Coordinate) => boolean
}

const SettingUpContext = createContext<SettingUpContextType>(null!)

export const SettingUpProvider = ({
  game,
  initShips,
  children,
}: {
  game: GameState
  initShips: ShipValue[]
  children: React.ReactNode
}) => {
  const [ships, setShips] = useState<ShipValue[]>(initShips || [])
  const [active, setActive] = useState<ShipValue | null>(null)

  function select(ship: ShipValue) {
    if (ship.id === active?.id) {
      setActive(null)
    } else {
      setActive(ship)
    }
  }

  async function add(ship: ShipValue, coordinate: Coordinate) {
    const createdShip = await addShipAction({
      ship,
      gameId: game.id,
      coordinate,
    })

    setShips((prev) => [
      ...prev,
      {
        id: createdShip.id,
        label: createdShip.label,
        size: createdShip.size,
        orientation: createdShip.orientation,
        status: createdShip.status,
        coordinates: getShipCoordinates({
          size: ship.size,
          orientation: ship.orientation,
          coordinate,
        }),
      },
    ])
    setActive(null)
  }

  async function remove(shipId: string) {
    await removeShipAction({
      gameId: game.id,
      shipId: shipId,
    })
    setShips((prev) => prev.filter((s) => s.id !== shipId))
    setActive(null)
  }

  function rotate(ship: ShipValue) {
    setActive((prevState) => {
      if (!prevState) return null
      return {
        ...prevState,
        orientation:
          prevState.orientation === Orientation.Horizontal
            ? Orientation.Vertical
            : Orientation.Horizontal,
      }
    })
  }

  function validate(ship: ShipValue, coordinate: Coordinate): boolean {
    // get ship's coordinates
    const { size, orientation } = ship
    const shipCoordinates = getShipCoordinates({
      orientation,
      size,
      coordinate,
    })

    // check if all coordinates are in the grid
    if (orientation === Orientation.Horizontal) {
      const lastCol = shipCoordinates[shipCoordinates.length - 1].col
      if (lastCol >= game.cols) return false
    }
    if (orientation === Orientation.Vertical) {
      const lastRow = shipCoordinates[shipCoordinates.length - 1].row
      if (lastRow >= game.rows) return false
    }

    // check if all coordinates are empty
    const collision = ships.some((s) =>
      s.coordinates.some((coord) =>
        shipCoordinates.some((c) => c.row === coord.row && c.col === coord.col),
      ),
    )

    return !collision
  }

  const value = {
    game,
    active,
    ships,

    select,
    add,
    remove,
    rotate,
    validate,
  }

  return (
    <SettingUpContext.Provider value={value}>
      {children}
    </SettingUpContext.Provider>
  )
}

export const useSettingUp = () => {
  const context = useContext(SettingUpContext)
  if (!context) {
    throw new Error('useSettingUp must be used within a SettingUpProvider')
  }
  return context
}

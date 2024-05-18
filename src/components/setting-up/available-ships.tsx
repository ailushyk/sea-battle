'use client'

import React from 'react'
import { XIcon } from 'lucide-react'

import { availableShips } from '@/lib/game'
import { cn } from '@/lib/utils'
import { useSettingUp } from '@/components/setting-up/setting-up-provider'
import { Ship, ShipLabel } from '@/components/ship'
import { Button } from '@/components/ui/button'
import { ShipValue } from '@/types'

export function AvailableShips() {
  const { currentShip, ships, selectCurrentShip, removeShip } = useSettingUp()

  function isPositioned(ship: ShipValue) {
    return !!ships.find((s) => s.id === ship.id)
  }

  return (
    <div>
      {availableShips.map((ship) => (
        <div key={ship.id}>
          <ShipLabel ship={ship} />
          <div className="flex items-center gap-2">
            <Ship
              ship={ship}
              active={currentShip?.id === ship.id}
              disabled={isPositioned(ship)}
              onClick={() => selectCurrentShip(ship)}
            />
            <Button
              size="icon"
              variant="destructive"
              className={cn('h-8 w-8', {
                invisible: !isPositioned(ship),
              })}
              disabled={!isPositioned(ship)}
              onClick={() => removeShip(ship)}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

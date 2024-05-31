'use client'

import React from 'react'
import { XIcon } from 'lucide-react'

import { AVAILABLE_SHIPS } from '@/lib/game'
import { cn } from '@/lib/utils'
import { useSettingUp } from '@/components/setting-up/setting-up-provider'
import { Ship, ShipLabel } from '@/components/ship'
import { Button } from '@/components/ui/button'

export function AvailableShips() {
  const { ships, active, select, remove } = useSettingUp()

  return (
    <div>
      {AVAILABLE_SHIPS.map((ship) => {
        const isPlaced = ships.find((s) => s.label.toLowerCase() === ship.id)
        return (
          <div key={ship.id}>
            <ShipLabel>{ship.label}</ShipLabel>
            <div className="flex items-center gap-2">
              <Ship
                orientation={ship.orientation}
                size={ship.size}
                active={active?.id === ship.id}
                disabled={!!isPlaced}
                onClick={() => select(ship)}
              />
              {isPlaced && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-6 w-6"
                  disabled={!isPlaced}
                  onClick={() => remove(isPlaced?.id)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

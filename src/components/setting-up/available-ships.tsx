import React from 'react'
import { XIcon } from 'lucide-react'

import { availableShips } from '@/lib/game'
import { cn } from '@/lib/utils'
import { Ship, ShipLabel } from '@/components/ship'
import { Button } from '@/components/ui/button'
import { ShipValue } from '@/types'

export function AvailableShips({
  active,
  positioned,
  onActive,
  onRemove,
}: {
  active: ShipValue | null
  positioned: ShipValue[]
  onActive(ship: ShipValue): void
  onRemove(ship: ShipValue): void
}) {
  function isPositioned(ship: ShipValue) {
    return !!positioned.find((s) => s.id === ship.id)
  }

  return (
    <div>
      {availableShips.map((ship) => (
        <div key={ship.id}>
          <ShipLabel ship={ship} />
          <div className="flex items-center gap-2">
            <Ship
              ship={ship}
              active={active?.id === ship.id}
              disabled={isPositioned(ship)}
              onClick={() => onActive(ship)}
            />
            <Button
              size="icon"
              variant="destructive"
              className={cn('h-8 w-8', {
                invisible: !isPositioned(ship),
              })}
              disabled={!isPositioned(ship)}
              onClick={() => onRemove(ship)}
            >
              <XIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

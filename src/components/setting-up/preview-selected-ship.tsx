'use client'

import { useSettingUp } from '@/components/setting-up/setting-up-provider'
import { Ship, ShipLabel } from '@/components/ship'

export function PreviewSelectedShip() {
  const { currentShip, rotateShip } = useSettingUp()
  if (!currentShip) return <div>Select a ship to preview</div>

  return (
    <div className="text-center">
      <ShipLabel ship={currentShip} className="font-semibold" />
      <div className="text-sm text-muted-foreground">
        Click on the ship to rotate it
      </div>
      <div className="flex h-48 items-center justify-center">
        <Ship
          ship={currentShip}
          active
          onClick={() => {
            rotateShip(currentShip)
          }}
        />
      </div>
    </div>
  )
}

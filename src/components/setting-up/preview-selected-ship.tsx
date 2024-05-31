'use client'

import { useSettingUp } from '@/components/setting-up/setting-up-provider'
import { Ship, ShipLabel } from '@/components/ship'

// TODO: add hotkey to rotate the ship
export function PreviewSelectedShip() {
  const { active, rotate } = useSettingUp()
  if (!active) return <div>Select a ship to preview</div>

  return (
    <div className="text-center">
      <ShipLabel className="font-semibold">{active.label}</ShipLabel>
      <div className="text-sm text-muted-foreground">
        Click on the ship to rotate it
      </div>
      <div className="flex h-48 items-center justify-center">
        <Ship
          orientation={active.orientation}
          size={active.size}
          active
          onClick={() => {
            rotate(active)
          }}
        />
      </div>
    </div>
  )
}

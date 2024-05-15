import { ShipValue } from '@/lib/game'
import { Ship, ShipLabel } from '@/components/ship'

export function PreviewSelectedShip({
  ship,
  rotateShip,
}: {
  ship: ShipValue | null
  rotateShip: (ship: ShipValue) => void
}) {
  if (!ship) return <div>Select a ship to preview</div>

  return (
    <div className="text-center">
      <ShipLabel ship={ship} className="font-semibold" />
      <div className="text-sm text-muted-foreground">
        Click on the ship to rotate it
      </div>
      <div className="flex h-48 items-center justify-center">
        <Ship
          ship={ship}
          active
          onClick={() => {
            console.log("rotate ship's orientation")
            rotateShip(ship)
          }}
        />
      </div>
    </div>
  )
}

'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import { battlefieldConfig, generateRandomGrid } from '@/lib/battlefield'
import { ships } from '@/lib/game'
import { cn } from '@/lib/utils'
import { startGameAction } from '@/actions/game.actions'
import { BattleField } from '@/components/battle-field'
import { PreviewSelectedShip } from '@/components/setting-up/preview-selected-ship'
import { useSettingUp } from '@/components/setting-up/use-setting-up'
import { Ship, ShipLabel } from '@/components/ship'
import { Button } from '@/components/ui/button'

export function SettingUpShips() {
  const router = useRouter()
  const {
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
  } = useSettingUp(battlefieldConfig)

  return (
    <div className="space-y-8">
      <h1>Ships</h1>

      <div className="grid grid-cols-2 gap-4">
        <div>
          {ships.map((ship) => (
            <div key={ship.id}>
              <ShipLabel ship={ship} />
              <div className="flex items-center gap-2">
                <Ship
                  ship={ship}
                  active={currentShip?.id === ship.id}
                  disabled={selected.includes(ship.id)}
                  onClick={() => selectCurrentShip(ship)}
                />
                <Button
                  size="icon"
                  variant="destructive"
                  disabled={!selected.includes(ship.id)}
                  className={cn('h-8 w-8', {
                    invisible: !selected.includes(ship.id),
                  })}
                  onClick={() => removeShip(ship)}
                >
                  x
                </Button>
              </div>
            </div>
          ))}
        </div>

        <PreviewSelectedShip ship={currentShip} rotateShip={rotateShip} />
      </div>

      <div className="flex justify-center">
        <BattleField
          grid={grid}
          onClick={addShip}
          onHover={checkField}
          onBlur={resetValidation}
        />
      </div>

      <div className="flex justify-center gap-4">
        <Button size="lg" variant="destructive" onClick={reset}>
          Reset
        </Button>
        <Button
          size="lg"
          disabled={selected.length !== ships.length}
          onClick={async () => {
            console.log('use server')
            await startGameAction({ grid })
            router.push('/playground')
          }}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

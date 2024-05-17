'use client'

import React from 'react'

import { availableShips } from '@/lib/game'
import { startGameAction } from '@/actions/game.actions'
import {
  BattleField,
  BattleFieldBody,
  BattleFieldCell,
  BattleFieldCellPreview,
  BattleFieldColsHeader,
  BattleFieldRow,
  BattleFieldRowHeader,
} from '@/components/battle-field'
import { AvailableShips } from '@/components/setting-up/available-ships'
import { PreviewSelectedShip } from '@/components/setting-up/preview-selected-ship'
import { useSettingUp } from '@/components/setting-up/use-setting-up'
import { Button } from '@/components/ui/button'
import { GameState, Ships } from '@/types'

export function SettingUpShips({
  game,
  initShips,
}: {
  game: GameState
  initShips?: Ships
}) {
  const {
    grid,
    currentShip,
    ships,
    selectCurrentShip,
    addShip,
    getPreviewCellValue,
    preview,
    rotateShip,
    removeShip,
    reset,
    resetValidation,
  } = useSettingUp({ game, initShips })

  return (
    <div className="space-y-8">
      <h1>Ships</h1>

      <div className="grid grid-cols-2 gap-4">
        <AvailableShips
          active={currentShip}
          positioned={ships}
          onActive={selectCurrentShip}
          onRemove={removeShip}
        />
        <PreviewSelectedShip ship={currentShip} rotateShip={rotateShip} />
      </div>

      <div className="flex justify-center">
        <BattleField>
          <BattleFieldColsHeader cols={game.cols} />
          {grid.map((cells, row) => (
            <BattleFieldRow key={`row-${row}`}>
              <BattleFieldRowHeader row={row} />
              <BattleFieldBody onBlur={resetValidation}>
                {cells.map((cell, _col) => (
                  <div key={cell.id} className="relative">
                    <BattleFieldCell cell={cell} />
                    <BattleFieldCellPreview
                      value={getPreviewCellValue(cell.position)}
                      className="absolute inset-0"
                      onClick={() => addShip({ position: cell.position })}
                      onHover={() => preview({ position: cell.position })}
                    />
                  </div>
                ))}
              </BattleFieldBody>
            </BattleFieldRow>
          ))}
        </BattleField>
      </div>

      <div className="flex justify-center gap-4">
        <Button size="lg" variant="destructive" onClick={reset}>
          Reset
        </Button>
        <Button
          size="lg"
          disabled={ships.length !== availableShips.length}
          onClick={async () => {
            await startGameAction({ game, ships })
          }}
        >
          Start
        </Button>
      </div>
    </div>
  )
}

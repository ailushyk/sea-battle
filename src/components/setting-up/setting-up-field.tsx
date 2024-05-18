'use client'

import React, { useMemo } from 'react'

import { generateGridView } from '@/lib/battlefield'
import { availableShips } from '@/lib/game'
import { startGameAction } from '@/actions/game.actions'
import { BattleField } from '@/components/battle-field/battle-field'
import { BattleFieldBody } from '@/components/battle-field/battle-field-body'
import { BattleFieldCell } from '@/components/battle-field/battle-field-cell'
import { BattleFieldCellPreview } from '@/components/battle-field/battle-field-cell-preview'
import { BattleFieldColsHeader } from '@/components/battle-field/battle-field-cols-header'
import { BattleFieldRow } from '@/components/battle-field/battle-field-row'
import { BattleFieldRowHeader } from '@/components/battle-field/battle-field-row-header'
import { useSettingUp } from '@/components/setting-up/setting-up-provider'
import { Button } from '@/components/ui/button'

export function SettingUpField() {
  const {
    game,
    ships,
    addShip,
    getPreviewCellValue,
    showPreview,
    reset,
    resetValidation,
  } = useSettingUp()

  const grid = useMemo(() => {
    return generateGridView({
      game,
      ships,
    })
  }, [game, ships])

  return (
    <React.Fragment>
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
                      onHover={() => showPreview({ position: cell.position })}
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
    </React.Fragment>
  )
}

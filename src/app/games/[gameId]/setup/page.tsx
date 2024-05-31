import React from 'react'
import { notFound } from 'next/navigation'

import { generateGridView } from '@/lib/battlefield'
import { BattleField } from '@/components/battle-field-refactor/battle-field'
import { BattleFieldCell } from '@/components/battle-field-refactor/battle-field-cell'
import { BattleFieldCellPreview } from '@/components/battle-field-refactor/battle-field-cell-preview'
import { BattleFieldColsHeader } from '@/components/battle-field-refactor/battle-field-cols-header'
import { BattleFieldRow } from '@/components/battle-field-refactor/battle-field-row'
import { BattleFieldRowHeader } from '@/components/battle-field-refactor/battle-field-row-header'
import { AvailableShips } from '@/components/setting-up/available-ships'
import { PreviewSelectedShip } from '@/components/setting-up/preview-selected-ship'
import { SettingUpProvider } from '@/components/setting-up/setting-up-provider'
import { Button } from '@/components/ui/button'
import { gameService } from '@/services/game.service'

type Props = {
  params: {
    gameId: string
  }
}

async function SetupPage({ params }: Props) {
  const [game, ships] = await Promise.all([
    gameService.get({ gameId: params.gameId }),
    gameService.getShips({ gameId: params.gameId }),
  ])

  if (!game) {
    notFound()
  }

  const grid = generateGridView({
    game,
    ships,
  })

  return (
    <div>
      <SettingUpProvider game={game} initShips={ships}>
        <div className="container max-w-lg">
          <h1>Start</h1>
          <div className="space-y-8">
            <h1>Ships</h1>

            <div className="grid grid-cols-2 gap-4">
              <AvailableShips />
              <PreviewSelectedShip />
            </div>

            <div className="flex justify-center">
              <BattleField>
                <BattleFieldColsHeader cols={game.cols} />
                {grid.map((cells, row) => (
                  <BattleFieldRow key={`row-${row}`}>
                    <BattleFieldRowHeader row={row} />
                    {cells.map((cell, _col) => (
                      <div key={cell.id} className="relative">
                        <BattleFieldCell cell={cell}>
                          <BattleFieldCellPreview cell={cell} />
                        </BattleFieldCell>
                      </div>
                    ))}
                  </BattleFieldRow>
                ))}
              </BattleField>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            variant="destructive"
            // onClick={reset}
          >
            Reset
          </Button>
          <Button
            size="lg"
            // disabled={ships.length !== availableShips.length}
            // onClick={async () => {
            //   await startGameAction({ game, ships })
            // }}
          >
            Start
          </Button>
        </div>
      </SettingUpProvider>

      <div>
        <code>
          <pre>{JSON.stringify(game, null, 2)}</pre>
          <pre>{JSON.stringify(ships, null, 2)}</pre>
        </code>
      </div>
    </div>
  )
}

export default SetupPage

'use client'

import { useOptimistic, useTransition } from 'react'

import { hitCell } from '@/lib/battlefield'
import { cn } from '@/lib/utils'
import { Cell, Grid, Position } from '@/types'

export function BattleField({
  grid,
  hideShips,
  onClick,
  onHover,
  onBlur,
}: {
  grid: Cell[][]
  hideShips?: boolean
  onClick?({ position }: { position: Position }): void
  onHover?({ position }: { position: Position }): void
  onBlur?(): void
}) {
  return (
    <div className="flex gap-4">
      <div>
        <BattleFieldColsHeader cols={grid[0]?.length} />

        {grid.map((_cols, _row) => (
          <div key={`row-${_row}`} className="flex">
            <BattleFieldRowsHeader row={_row} />

            <div className="flex" onMouseLeave={onBlur}>
              {_cols.map((cell, _col) => (
                <button
                  key={`col-${cell.id}`}
                  disabled={!onClick}
                  onClick={() => {
                    onClick?.({ position: cell.position })
                  }}
                  onMouseEnter={() => {
                    onHover?.({ position: cell.position })
                  }}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center border text-gray-200',
                    {
                      'border-blue-500 bg-blue-500/70': !hideShips && cell.ship,
                      'bg-red-500': cell.hit === 'hit',
                      'bg-gray-300/30': cell.hit === 'miss',
                      'border-green-600 bg-green-300/30':
                        cell.validation === 'valid',
                      'border-red-300 bg-red-300/30':
                        cell.validation === 'invalid',
                    },
                  )}
                >
                  {' '}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BattleFieldColsHeader({ cols }: { cols: number }) {
  return (
    <div className="flex">
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <div
          key={`header-col-${i}`}
          className="flex h-8 w-8 items-center justify-center"
        >
          {i === 0 ? '' : i}
        </div>
      ))}
    </div>
  )
}

function BattleFieldRowsHeader({ row }: { row: number }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      {String.fromCharCode(64 + row + 1)}
    </div>
  )
}

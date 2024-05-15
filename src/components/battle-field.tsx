import { resetGridValidation } from '@/lib/battlefield'
import { Cell, Position } from '@/lib/game'
import { cn } from '@/lib/utils'

export function BattleField({
  grid,
  onClick,
  onHover,
  onBlur,
}: {
  grid: Cell[][]
  onClick({ position }: { position: Position }): void
  onHover?({ position }: { position: Position }): void
  onBlur?(): void
}) {
  return (
    <div className="flex gap-4">
      <div>
        <BattleFieldColsHeader cols={grid.length} />

        {grid.map((_cols, _row) => (
          <div key={`row-${_row}`} className="flex">
            <BattleFieldRowsHeader row={_row} />

            <div className="flex" onMouseLeave={onBlur}>
              {_cols.map((cell, _col) => (
                <button
                  key={`col-${cell.id}`}
                  onClick={() => {
                    onClick({ position: cell.position })
                  }}
                  onMouseEnter={() => {
                    onHover && onHover({ position: cell.position })
                  }}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center border text-gray-200',
                    {
                      'border-blue-500 bg-blue-500/70': cell.ship,
                      'bg-red-500': cell.hit === 'hit',
                      'bg-gray-200/30': cell.hit === 'miss',
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

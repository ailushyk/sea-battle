'use client'

import { CircleIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Cell, Position } from '@/types'

export const BattleFieldCell = ({
  cell,
  hide,
  children,
  onClick,
  onHover,
}: {
  cell: Cell
  hide?: boolean
  children?: React.ReactNode
  onClick?({ position }: { position: Position }): void
  onHover?(): void
}) => {
  const Component = onClick ? 'button' : 'div'
  const hit = cell.hit
  return (
    <Component
      className={cn(
        'flex h-8 w-8 items-center justify-center border text-gray-200',
        {
          'border-blue-500 bg-blue-500/70': !hide && cell.ship,
          'bg-red-500': hit === 'hit',
          'bg-gray-300/30': hit === 'missed',
        },
      )}
      onClick={() => onClick?.({ position: cell.position })}
      onMouseEnter={onHover}
    >
      {children || hit === 'hit' ? (
        <XIcon className="h-4 w-4" />
      ) : hit === 'missed' ? (
        <CircleIcon className="h-4 w-4 text-gray-300" />
      ) : (
        ''
      )}
    </Component>
  )
}

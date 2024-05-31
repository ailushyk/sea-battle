'use client'

import React from 'react'
import { cva } from 'class-variance-authority'
import { CircleIcon, DotIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Cell, CellValue, Coordinate } from '@/types'

export const battleFieldCellVariants = cva(
  'flex shrink-0 items-center justify-center border',
  {
    variants: {
      intent: {
        default: 'text-gray-200',
        ship: 'border-blue-500 bg-blue-500/70',
        hit: 'bg-red-500',
        missed: 'bg-gray-300/30',
        valid: 'border-green-500 bg-green-300/70',
        invalid: 'border-red-500 bg-red-300/70',
      },
      size: {
        default: 'h-8 w-8',
      },
    },
    defaultVariants: {
      intent: 'default',
      size: 'default',
    },
  },
)

export const BattleFieldCell = ({
  cell,
  hide,
  children,
  onClick,
}: {
  cell: Cell
  hide?: boolean
  children?: React.ReactNode
  onClick?({ coordinate }: { coordinate: Coordinate }): void
}) => {
  const Component = onClick ? 'button' : 'div'
  return (
    <Component
      className={cn(
        battleFieldCellVariants({
          intent: getVariant(cell, hide),
        }),
      )}
      onClick={() => onClick?.({ coordinate: cell.coordinate })}
    >
      {children || <CellView value={cell.value} />}
    </Component>
  )
}

function CellView({ value }: { value: CellValue }) {
  if (value === 'hit') return <XIcon className="h-4 w-4" />
  if (value === 'missed') return <DotIcon className="h-4 w-4 text-gray-300" />
  if (value === 'ship') return <CircleIcon className="h-4 w-4" />
  return null
}

function getVariant(cell: Cell, hide?: boolean) {
  if (cell.value === 'hit') return 'hit'
  if (cell.value === 'missed') return 'missed'
  if (!hide && cell.value) return 'ship'
  return 'default'
}

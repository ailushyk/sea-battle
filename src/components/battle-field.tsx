'use client'

import React from 'react'
import { CircleIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Cell, GameState, Position, PositionValidationValue } from '@/types'

export function BattleField({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>
}

export function BattleFieldColsHeader({
  cols,
  align = 'right',
}: {
  cols: number
  align?: 'left' | 'right'
}) {
  return (
    <div className="flex">
      {Array.from({ length: cols + 1 }).map((_, i) => (
        <div
          key={`header-col-${i}`}
          className="flex h-8 w-8 items-center justify-center"
        >
          {align === 'right' ? (i === 0 ? '' : i) : i === cols ? '' : i + 1}
        </div>
      ))}
    </div>
  )
}

export function BattleFieldRowHeader({ row }: { row: number }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      {String.fromCharCode(64 + row + 1)}
    </div>
  )
}

export function BattleFieldRow({ children }: { children: React.ReactNode }) {
  return <div className={cn('flex')}>{children}</div>
}

export const BattleFieldBody = ({
  children,
  onBlur,
}: {
  children: React.ReactNode
  onBlur?(): void
}) => {
  return (
    <div className="flex" onMouseLeave={onBlur}>
      {children}
    </div>
  )
}

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

export const BattleFieldCellPreview = ({
  value,
  className,
  onClick,
  onHover,
}: {
  value?: PositionValidationValue
  className?: string
  onClick?(): void
  onHover?(): void
}) => {
  return (
    <button
      className={cn(
        'flex h-8 w-8 items-center justify-center border border-transparent',
        {
          'border-green-500 bg-green-300/70': value === 'valid',
          'border-red-500 bg-red-300/70': value === 'invalid',
        },
        className,
      )}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      {value === 'invalid' ? (
        <XIcon className="h-4 w-4 text-destructive-foreground" />
      ) : value === 'valid' ? (
        <CircleIcon className="h-4 w-4 text-destructive-foreground" />
      ) : (
        ''
      )}
    </button>
  )
}

export function BattleFieldGap({ game }: { game: GameState }) {
  return (
    <div className="flex flex-1 flex-col">
      {Array.from({ length: game.rows + 1 }).map((_, i) => (
        <div
          key={`row-${i}`}
          className="h-8 w-full flex-1 border-y border-border/50 first:border-transparent"
        />
      ))}
    </div>
  )
}

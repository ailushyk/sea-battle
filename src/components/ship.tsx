import React from 'react'

import { Orientation, ShipType, ShipValue } from '@/lib/game'
import { cn } from '@/lib/utils'

export function Ship({
  ship,
  active,
  disabled,
  children,
  className,
  onClick,
}: {
  ship: ShipValue
  children?: React.ReactNode
  active?: boolean
  disabled?: boolean
  className?: string
  onClick(): void
}) {
  return (
    <div className={cn(className)}>
      <button
        className={cn('flex', {
          'bg-blue-500': active,
          'bg-gray-200/30': disabled,
          'flex-col': ship?.orientation === Orientation.Vertical,
        })}
        disabled={disabled}
        onClick={onClick}
      >
        {Array.from({ length: ship.size }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'flex h-8 w-8 items-center justify-center border text-gray-200',
            )}
          >
            {children}
          </div>
        ))}
      </button>
    </div>
  )
}

export function ShipLabel({
  ship,
  className,
}: {
  ship: ShipValue
  className?: string
}) {
  return <div className={className}>{ShipType[ship.type]}</div>
}

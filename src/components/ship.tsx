import React from 'react'

import { cn } from '@/lib/utils'
import { Orientation } from '@/types'

export function Ship({
  children,
  orientation,
  size,
  active,
  disabled,
  className,
  onClick,
}: {
  children?: React.ReactNode
  orientation: Orientation
  size: number
  active?: boolean
  disabled?: boolean
  className?: string
  onClick?(): void
}) {
  return (
    <div className={cn(className)}>
      <button
        className={cn('flex', {
          'bg-blue-500': active,
          'bg-gray-200/30': disabled,
          'flex-col': orientation === Orientation.Vertical,
        })}
        disabled={disabled}
        onClick={onClick}
      >
        {Array.from({ length: size }).map((_, i) => (
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
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

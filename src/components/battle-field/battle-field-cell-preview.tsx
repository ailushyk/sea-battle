'use client'

import { CircleIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { RenderCounter } from '@/components/render-counter'
import { PositionValidationValue } from '@/types'

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
      <RenderCounter />
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

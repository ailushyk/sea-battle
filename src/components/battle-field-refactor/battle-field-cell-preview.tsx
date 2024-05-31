'use client'

import { useState } from 'react'
import { CircleIcon, XIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { battleFieldCellVariants } from '@/components/battle-field-refactor/battle-field-cell'
import { useSettingUp } from '@/components/setting-up/setting-up-provider'
import { Cell, Coordinate, PositionValidationValue, ShipValue } from '@/types'

type Props = {
  cell: Cell
  className?: string
  // onClick(params: { ship: ShipValue; coordinate: Coordinate }): void
}

export const BattleFieldCellPreview = ({ cell, className }: Props) => {
  const { active, ships, validate, add } = useSettingUp()
  const [value, setValue] = useState<PositionValidationValue>(null)

  const handleHover = () => {
    if (!active) return
    const isValid = validate(active, cell.coordinate)
    setValue(isValid ? 'valid' : 'invalid')
  }

  const handleBlur = () => {
    setValue(null)
  }

  const handleClick = () => {
    if (!active) return
    add(active, cell.coordinate)
  }

  return (
    <div
      className={cn('absolute inset-0 flex transition-colors duration-200', {
        'bg-green-300/20': !!active,
        'flex-col': active?.orientation === 'vertical',
      })}
    >
      <button
        className={cn(battleFieldCellVariants({ intent: value }), className)}
        onClick={handleClick}
        onMouseEnter={handleHover}
        onMouseLeave={handleBlur}
      >
        <PreviewIcon validation={value} />
      </button>

      {value &&
        active &&
        Array.from({ length: active.size - 1 }).map((_, i) => {
          return (
            <div
              key={`${cell.id}-${i}-preview`}
              className={battleFieldCellVariants({
                intent: value,
              })}
            >
              <PreviewIcon validation={value} />
            </div>
          )
        })}
    </div>
  )
}

function PreviewIcon({ validation }: { validation?: PositionValidationValue }) {
  return (
    <div>
      {validation === 'invalid' ? (
        <XIcon className="h-4 w-4 text-destructive-foreground" />
      ) : validation === 'valid' ? (
        <CircleIcon className="h-4 w-4 text-destructive-foreground" />
      ) : (
        ''
      )}
    </div>
  )
}

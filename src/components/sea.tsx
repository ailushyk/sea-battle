import { BattleField } from '@/components/battle-field'

export function Sea({ rows, cols }: { rows: number; cols: number }) {
  return (
    <div className="flex">
      <BattleField rows={rows} cols={cols} />
      <BattleField rows={rows} cols={cols} />
    </div>
  )
}

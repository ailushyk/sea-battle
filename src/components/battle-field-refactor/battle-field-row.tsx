import { cn } from '@/lib/utils'

export function BattleFieldRow({ children }: { children: React.ReactNode }) {
  return <div className={cn('flex')}>{children}</div>
}
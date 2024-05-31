import { GameState } from '@/types'

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
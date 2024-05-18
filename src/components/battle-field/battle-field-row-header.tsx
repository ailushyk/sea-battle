export function BattleFieldRowHeader({ row }: { row: number }) {
  return (
    <div className="flex h-8 w-8 items-center justify-center">
      {String.fromCharCode(64 + row + 1)}
    </div>
  )
}

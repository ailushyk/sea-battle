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

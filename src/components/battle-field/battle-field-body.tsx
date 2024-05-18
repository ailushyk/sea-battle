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

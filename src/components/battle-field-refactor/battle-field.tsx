import React from 'react'

export function BattleField({ children }: { children: React.ReactNode }) {
  return <div className="overflow-hidden">{children}</div>
}

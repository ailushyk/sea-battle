import { SettingUpShips } from '@/components/setting-up/setting-up-ships'
import { Orientation, Position, ShipType } from '@/types'

export default async function Page() {
  return (
    <div className="container max-w-lg">
      <h1>Start</h1>
      <SettingUpShips />
    </div>
  )
}

type Player = {
  id: string
  name: string
  currentGame: string // id of the game
}

type GameRefactor = {
  id: string
  players: [Player, Player]
  ships: Record<
    string,
    {
      type: ShipType
      positions: Position[]
      direction: Orientation
    }
  >
  shots: Record<
    string,
    {
      position: Position
      player: Player
      hit: 'hit' | 'missed'
      timestamp: number
    }
  >
}

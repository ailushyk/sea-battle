export type Hit = {
  player: string
  row: number
  col: number
}
export enum ShipType {
  Carrier = 5,
  Battleship = 4,
  Cruiser = 3,
  Submarine = 3,
  Destroyer = 2,
}
export enum Orientation {
  Horizontal,
  Vertical,
}
export type Position = {
  row: number
  col: number
}
export type Cell = {
  id: string
  position: Position
  ship: string | null // ship id
  hit: 'hit' | 'miss' | null
  validation?: 'valid' | 'invalid' | null
}
export type Grid = Cell[][]
export type ShipValue = {
  id: string
  type: ShipType
  size: number
  positions?: Position[]
  orientation: Orientation
  cells?: Cell[]
  hits?: boolean[]
}
export type Game = {
  id: string
  status: 'setting-up' | 'playing' | 'finished'
  players: string[]
  hits: Hit[]
  currentTurn?: string
  grid: Cell[][]
  aiGrid: Cell[][]
}

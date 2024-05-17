export type Player = {
  id: string
  name: string
  currentGame: string // id of the game
}
export type ShotValue = 'hit' | 'missed' | null
export type Shot = {
  user: string
  position: Position
  hit: ShotValue
  timestamp: number
}
export type Shots = Array<Shot>
// TODO: rename to Ship
export type ShipValue = {
  id: string
  type: ShipType
  orientation: Orientation // TODO: rename to direction
  positions: Position[]
  // TODO: remove
  size: number
  cells?: Cell[]
  hits?: boolean[]
}
export type Ships = Array<ShipValue>
export type GameState = {
  id: string
  players: string[] // player ids
  rows: number
  cols: number
  timestamp: number
  status: 'setting-up' | 'playing' | 'finished'
}

// gameId:player1:ships
// gameId:player2:ships
// gameId:shots

/**
 * The types below are used in the Battleship game, deprecated
 */

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
export interface ValidatedPosition extends Position {
  valid: 'valid' | 'invalid' | null
}

export type PositionValidationValue = 'valid' | 'invalid' | null | undefined
export type Cell = {
  id: string
  position: Position
  ship: string | null // ship id
  hit: ShotValue
  validation?: PositionValidationValue
}
export type Grid = Cell[][]

export type Game = {
  id: string
  status: 'setting-up' | 'playing' | 'finished'
  players: string[]
  hits: Hit[]
  currentTurn?: string
  grid: Cell[][]
  aiGrid: Cell[][]
}

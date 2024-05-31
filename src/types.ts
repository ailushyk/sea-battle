export type GameState = {
  id: string
  players: string[] // player ids
  rows: number
  cols: number
  timestamp: number
  status: 'idle' | 'started' | 'finished'
}

export enum ShipSize {
  Carrier = 5,
  Battleship = 4,
  Cruiser = 3,
  Submarine = 3,
  Destroyer = 2,
}

export enum Orientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export type Coordinate = {
  row: number
  col: number
}

export type ShipValue = {
  id: string
  label: string
  size: number
  orientation: Orientation // TODO: rename to direction
  coordinates: Coordinate[]
  status: 'idle' | 'placed' | 'sunk'
}

export type Ships = Array<ShipValue>

export type ShotValue = 'hit' | 'missed'
export type Shot = {
  user: string
  coordinate: Coordinate
  hit: ShotValue
  timestamp: number
}
export type Shots = Array<Shot>

export type PositionValidationValue = 'valid' | 'invalid' | null
export type CellValue = 'ship' | 'hit' | 'missed' | null
export type Cell = {
  id: string
  coordinate: Coordinate
  value: CellValue
}
export type Grid = Cell[][]

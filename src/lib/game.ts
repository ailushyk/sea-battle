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

export type ShipValue = {
  id: string
  type: ShipType
  size: number
  positions?: Position[]
  orientation: Orientation
  cells?: Cell[]
  hits?: boolean[]
}

type GameState = {
  players: Player[]
  status: 'idle' | 'started' | 'finished'
  turn: string
  config: {
    x: number
    y: number
    ships: ShipValue[]
  }
  battlefield: Cell[][]
  shoots: {
    player: string
    position: Position
    result: 'hit' | 'miss'
  }[]
}

type Player = {
  id: string
  name: string
  ships: ShipPlacement[]
}

interface ShipPlacement extends ShipValue {
  position: Position
  direction: 'horizontal' | 'vertical'
  status: 'idle' | 'sunk' | 'hit'
}

export const ships: ShipValue[] = [
  {
    id: 'carrier',
    type: ShipType.Carrier,
    size: ShipType.Carrier,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'battleship',
    type: ShipType.Battleship,
    size: ShipType.Battleship,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'cruiser',
    type: ShipType.Cruiser,
    size: ShipType.Cruiser,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'submarine',
    type: ShipType.Submarine,
    size: ShipType.Submarine,
    orientation: Orientation.Horizontal,
  },
  {
    id: 'destroyer',
    type: ShipType.Destroyer,
    size: ShipType.Destroyer,
    orientation: Orientation.Horizontal,
  },
]

import { Orientation, ShipSize, ShipValue } from '@/types'

export const AVAILABLE_SHIPS: ShipValue[] = [
  {
    id: 'carrier',
    label: 'Carrier',
    size: ShipSize.Carrier,
    orientation: Orientation.Horizontal,
    coordinates: [],
    status: 'idle',
  },
  {
    id: 'battleship',
    label: 'Battleship',
    size: ShipSize.Battleship,
    orientation: Orientation.Horizontal,
    coordinates: [],
    status: 'idle',
  },
  {
    id: 'cruiser',
    label: 'Cruiser',
    size: ShipSize.Cruiser,
    orientation: Orientation.Horizontal,
    coordinates: [],
    status: 'idle',
  },
  {
    id: 'submarine',
    label: 'Submarine',
    size: ShipSize.Submarine,
    orientation: Orientation.Horizontal,
    coordinates: [],
    status: 'idle',
  },
  {
    id: 'destroyer',
    label: 'Destroyer',
    size: ShipSize.Destroyer,
    orientation: Orientation.Horizontal,
    coordinates: [],
    status: 'idle',
  },
]

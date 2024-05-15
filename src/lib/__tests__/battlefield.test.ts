import {
  addShipToGrid,
  initBattlefield,
  previewShipPosition,
  removeShipFromGrid,
  resetGridValidation,
} from '@/lib/battlefield'
import { Orientation, ShipType, ShipValue } from '@/lib/game'

export function createHorizontalBattleship(): ShipValue {
  return {
    id: 'test-horizontal-ship',
    type: ShipType.Battleship,
    size: ShipType.Battleship,
    orientation: Orientation.Horizontal,
  }
}

export function createVerticalBattleship(): ShipValue {
  return {
    id: 'test-vertical-ship',
    type: ShipType.Battleship,
    size: ShipType.Battleship,
    orientation: Orientation.Vertical,
  }
}

describe('init-battlefield', () => {
  it('returns correct battlefield', () => {
    const rows = 10
    const cols = 10
    const battlefield = initBattlefield(rows, cols)
    expect(battlefield.length).toBe(rows)
    expect(battlefield[0].length).toBe(cols)
    expect(battlefield[0][0]).toEqual({
      id: '0-0',
      ship: null,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
    })
  })

  it('add ship to grid', () => {
    const grid = initBattlefield(10, 10)
    const ship = createHorizontalBattleship()
    const position = {
      row: 0,
      col: 0,
    }
    const gridWithShip = addShipToGrid({
      grid,
      ship,
      position,
    })
    expect(gridWithShip[0][0]).toEqual({
      id: '0-0',
      ship: ship.id,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
      validation: null,
    })
  })

  it('Fail to add ship outside of grid', () => {
    const grid = initBattlefield(10, 10)
    const ship = createHorizontalBattleship()
    const position = {
      row: 9,
      col: 9,
    }
    const gridWithShip = addShipToGrid({
      grid,
      ship,
      position,
    })
    expect(gridWithShip[9][9]).toEqual({
      id: '9-9',
      ship: null,
      hit: null,
      position: {
        row: 9,
        col: 9,
      },
    })
  })

  it('Fail to add ship on top of another ship', () => {
    const grid = initBattlefield(10, 10)
    const shipH = createHorizontalBattleship()
    const shipV = createVerticalBattleship()
    const position = {
      row: 0,
      col: 0,
    }
    const gridWithShip = addShipToGrid({
      grid,
      ship: shipH,
      position,
    })
    expect(gridWithShip[0][0]).toEqual({
      id: '0-0',
      ship: shipH.id,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
      validation: null,
    })
    const gridWithShip2 = addShipToGrid({
      grid: gridWithShip,
      ship: shipV,
      position,
    })
    expect(gridWithShip2[0][0]).toEqual({
      id: '0-0',
      ship: shipH.id,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
      validation: null,
    })
    expect(gridWithShip2[1][0]).toEqual({
      id: '1-0',
      ship: null,
      hit: null,
      position: {
        row: 1,
        col: 0,
      },
    })
  })

  it('Success reset grid validation', () => {
    let grid = initBattlefield(10, 10)
    grid[0][0].validation = 'invalid'
    const resetGrid = resetGridValidation(grid)
    expect(resetGrid[0][0]).toEqual({
      id: '0-0',
      ship: null,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
      validation: null,
    })
  })

  it('Valid preview ship position', () => {
    const grid = initBattlefield(10, 10)
    const ship = createHorizontalBattleship()
    const position = {
      row: 0,
      col: 0,
    }
    const gridWithShip = previewShipPosition({
      grid,
      ship,
      position,
    })
    expect(gridWithShip[0][0].validation).toEqual('valid')
    expect(gridWithShip[0][1].validation).toEqual('valid')
    expect(gridWithShip[0][2].validation).toEqual('valid')
    expect(gridWithShip[0][3].validation).toEqual('valid')
    expect(gridWithShip[0][4].validation).toEqual(null)
    expect(gridWithShip[1][0].validation).toEqual(null)
  })
  it('Invalid preview ship position', () => {
    const grid = initBattlefield(10, 10)
    const ship = createHorizontalBattleship()
    const position = {
      row: 0,
      col: 8,
    }
    const gridWithShip = previewShipPosition({
      grid,
      ship,
      position,
    })
    expect(gridWithShip[0][7].validation).toEqual(null)
    expect(gridWithShip[0][8].validation).toEqual('invalid')
    expect(gridWithShip[0][9].validation).toEqual('invalid')
    expect(gridWithShip[0][4].validation).toEqual(null)
    expect(gridWithShip[1][0].validation).toEqual(null)
  })

  it('Success remove ship from grid', () => {
    const grid = initBattlefield(10, 10)
    const ship = createHorizontalBattleship()
    const position = {
      row: 0,
      col: 0,
    }
    const gridWithShip = addShipToGrid({
      grid,
      ship,
      position,
    })
    expect(gridWithShip[0][0]).toEqual({
      id: '0-0',
      ship: ship.id,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
      validation: null,
    })
    const gridWithoutShip = removeShipFromGrid({
      grid: gridWithShip,
      ship: ship,
    })
    expect(gridWithoutShip[0][0]).toEqual({
      id: '0-0',
      ship: null,
      hit: null,
      position: {
        row: 0,
        col: 0,
      },
      validation: null,
    })
  })
})

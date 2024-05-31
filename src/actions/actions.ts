'use server'

import { revalidatePath } from 'next/cache'

import { auth } from '@/lib/auth'
import { makeApiRequest } from '@/services/api-service'
import { Coordinate, ShipValue } from '@/types'

export async function addShipAction({
  gameId,
  ...params
}: {
  gameId: string
  ship: ShipValue
  coordinate: Coordinate
}) {
  const user = auth()
  const body = createShip(params)
  revalidatePath(`/api/games/${gameId}/setup`)
  return await makeApiRequest(`/api/games/${gameId}/ships`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.accessToken}`,
    },
    body: JSON.stringify(body),
  })
}

export async function removeShipAction({
  gameId,
  shipId,
}: {
  gameId: string
  shipId: string
}) {
  const user = auth()
  const r = await makeApiRequest(`/api/games/${gameId}/ships/${shipId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user?.accessToken}`,
    },
  })
  revalidatePath(`/api/games/${gameId}`)
}

function createShip({
  ship,
  coordinate,
}: {
  ship: ShipValue
  coordinate: Coordinate
}) {
  return {
    label: ship.label,
    size: ship.size,
    orientation: ship.orientation,
    row: coordinate.row,
    col: coordinate.col,
  }
}

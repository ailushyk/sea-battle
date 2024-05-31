import { notFound } from 'next/navigation'

import { gameService } from '@/services/game.service'

export default async function Page({
  params,
}: {
  params: {
    gameId: string
  }
}) {
  const game = await gameService.get({
    gameId: params.gameId,
  })

  if (!game) {
    notFound()
  }

  return <div>game page {params.gameId}</div>
}

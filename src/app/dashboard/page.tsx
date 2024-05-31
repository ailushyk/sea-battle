import { auth } from '@/lib/auth'
import { createGameAction } from '@/actions/game.actions'
import { Button } from '@/components/ui/button'
import { makeApiRequest } from '@/services/api-service'
import { GameState } from '@/types'

export default async function DashboardPage() {
  const games = await makeApiRequest('/api/games', {
    headers: new Headers({
      Authorization: `Bearer ${auth()?.accessToken}`,
    }),
  })

  function makeLink(game: GameState) {
    if (game.status === 'idle') {
      return `/games/${game.id}/setup`
    }
    return `/games/${game.id}`
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <h1>Sea Battle</h1>
      <form action={createGameAction}>
        <Button className="rounded-md border px-4 py-2">Play now!</Button>
      </form>

      <div>
        <h2>Previous games:</h2>
        <ul className="space-y-8">
          {games.map((game: any) => (
            <li
              key={game.id}
              className="overflow-hidden truncate rounded-md border p-2"
            >
              <Button asChild variant="link">
                <a href={makeLink(game)} className="min-w-0 ">
                  {game.id}
                </a>
              </Button>
              <div>Status: {game.status}</div>
              <div>{new Date(game.createdAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

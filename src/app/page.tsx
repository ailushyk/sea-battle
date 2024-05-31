import { loginAction } from '@/actions/login-action'
import { Button } from '@/components/ui/button'

export default async function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1>Sea Battle</h1>

      <form action={loginAction}>
        <Button>Dashboard</Button>
      </form>
    </div>
  )
}

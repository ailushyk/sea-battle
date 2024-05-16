import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1>Sea Battle</h1>
      <Link href="/start" className="rounded-md border px-4 py-2">
        Play now!
      </Link>
    </div>
  )
}

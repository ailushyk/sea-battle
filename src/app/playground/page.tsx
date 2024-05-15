import { SettingUpShips } from '@/components/setting-up/setting-up-ships'

const rows = 10
const cols = 10

export default function Page() {
  return (
    <div className="container max-w-lg">
      <h1>Playground</h1>

      <SettingUpShips rows={rows} cols={cols} />
    </div>
  )
}

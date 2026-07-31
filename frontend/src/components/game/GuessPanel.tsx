import { useGame } from "@/hooks/useGame"
import Search from "./Search"
import Mode from "./Mode"
import Stats from "./Stats"

const GuessPanel = () => {
  const { mode } = useGame()

  return (
    <div className="flex min-h-screen w-md flex-col items-center justify-center gap-6 overflow-hidden">
      <Mode mode={mode} />

      <Stats />

      <Search />
    </div>
  )
}

export default GuessPanel

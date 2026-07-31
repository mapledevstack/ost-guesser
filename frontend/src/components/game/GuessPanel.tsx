import { useGame } from "@/hooks/useGame"
import Search from "./Search"
import Mode from "./Mode"
import Stats from "./Stats"

const GuessPanel = () => {
  const { mode } = useGame()

  return (
    <div className="flex max-h-screen w-full flex-col items-center justify-start gap-2 overflow-hidden pt-24">
      <Mode mode={mode} />

      <Stats />

      <Search />
    </div>
  )
}

export default GuessPanel

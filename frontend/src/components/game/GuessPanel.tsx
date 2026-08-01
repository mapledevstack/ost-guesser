import { useGame } from "@/hooks/useGame"
import Search from "./Search"
import Mode from "./Mode"
import Stats from "./Stats"
import PrevGuesses from "./PrevGuesses"

const GuessPanel = () => {
  const { mode } = useGame()

  return (
    <div className="z-10 flex max-h-screen w-full flex-col items-center justify-start gap-2 overflow-hidden pt-24">
      <Mode mode={mode} />

      <Stats />

      <PrevGuesses />

      <Search />
    </div>
  )
}

export default GuessPanel

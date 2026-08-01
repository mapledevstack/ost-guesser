import { useGame } from "@/hooks/useGame"
import Search from "./Search"
import Mode from "./Mode"
import Stats from "./Stats"
import PrevGuesses from "./PrevGuesses"
import { Button } from "../ui/button"
import useNextEndless from "@/hooks/useNextEndless"
import useSession from "@/hooks/useSession"
import { cn } from "@/utils/cn"

const GuessPanel = () => {
  const { mode } = useGame()
  const { mutate: nextGame } = useNextEndless()
  const { data: session } = useSession()

  return (
    <div className="z-10 flex max-h-screen w-full flex-col items-center justify-start gap-2 overflow-hidden pt-24">
      <Mode mode={mode} />

      <Stats />

      <PrevGuesses />

      <Search />

      <Button
        onClick={() => nextGame()}
        className={cn(
          "hidden",
          mode === "endless" && session?.status !== "playing" && "block"
        )}
      >
        Next Game
      </Button>
    </div>
  )
}

export default GuessPanel

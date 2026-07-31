import GuessPanel from "@/components/game/GuessPanel"
import PlayerPanel from "@/components/game/PlayerPanel"
import GitHub from "@/components/layout/GitHub"
import UserMenu from "@/components/layout/UserMenu"

const GamePage = () => {
  return (
    <>
      <header>
        <UserMenu />
      </header>

      <main className="overflow-x-hidden overflow-y-auto bg-background md:h-screen md:overflow-y-hidden">
        <div className="flex min-h-screen flex-col gap-6 lg:flex-row">
          <PlayerPanel />
          <GuessPanel />
        </div>
      </main>

      <footer>
        <GitHub />
      </footer>
    </>
  )
}
export default GamePage

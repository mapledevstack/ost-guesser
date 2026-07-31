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

      <main className="min-h-screen bg-background">
        <div className="grid min-h-screen md:grid-cols-2">
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

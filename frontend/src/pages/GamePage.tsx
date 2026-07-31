import GuessPanel from "@/components/game/GuessPanel"
import PlayerPanel from "@/components/game/PlayerPanel"
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
    </>
  )
}
export default GamePage

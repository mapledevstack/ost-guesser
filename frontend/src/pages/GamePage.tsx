import GuessPanel from "@/components/game/GuessPanel"
import PlayerPanel from "@/components/game/PlayerPanel"

const GamePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen md:grid-cols-2">
        <PlayerPanel />
        <GuessPanel />
      </div>
    </main>
  )
}
export default GamePage

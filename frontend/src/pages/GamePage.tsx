import GuessPanel from "@/components/game/GuessPanel"
import PlayerPanel from "@/components/game/PlayerPanel"
import UserMenu from "@/components/layout/UserMenu"
import useUser from "@/hooks/useAuthUser"
import useMe from "@/hooks/useMe"

const GamePage = () => {
  const { data: me } = useMe()

  console.log(me)

  const { data: user } = useUser()

  console.log(user)

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

import GuessPanel from "@/components/game/GuessPanel"
import PlayerPanel from "@/components/game/PlayerPanel"
import GitHub from "@/components/layout/GitHub"
import ParallaxBackground from "@/components/layout/ParallaxBackground"
import UserMenu from "@/components/layout/UserMenu"
import usePreloadAlbumCovers from "@/hooks/usePreloadAlbumCovers"
import useSession from "@/hooks/useSession"
import { getAlbumCoverUrl } from "@/utils/helpers"

const GamePage = () => {
  usePreloadAlbumCovers()

  const { data: session } = useSession()

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {session?.answer && (
        <ParallaxBackground
          src={getAlbumCoverUrl(session.answer.albumId)}
          blur={true}
        />
      )}

      <header>
        <UserMenu />
      </header>

      <main
        className="overflow-x-hidden overflow-y-auto md:h-screen md:overflow-y-hidden"
        style={{
          background: "linear-gradient(to bottom, black, var(--background))",
        }}
      >
        <div className="flex min-h-screen flex-col gap-6 lg:flex-row">
          <PlayerPanel />
          <GuessPanel />
        </div>
      </main>

      <footer>
        <GitHub />
      </footer>
    </div>
  )
}
export default GamePage

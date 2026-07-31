import useSession from "@/hooks/useSession"
import { Volume2 } from "lucide-react"
import useAudioPlayer from "@/hooks/useAudioPlayer"
import DiscPlayer from "./DiscPlayer"

const PlayerPanel = () => {
  const { data: session, isLoading } = useSession()

  if (isLoading || !session) return null

  return <Player session={session} />
}

type PlayerProps = {
  session: {
    clipUrl: string
  }
}

const Player = ({ session }: PlayerProps) => {
  const {
    audioRef,
    isPlaying,
    volume,
    progress,
    hasEnded,
    togglePlay,
    replay,
    seek,
    setVolume,
  } = useAudioPlayer()

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <audio ref={audioRef} src={session.clipUrl} />

      <DiscPlayer
        hasEnded={hasEnded}
        isPlaying={isPlaying}
        progress={progress}
        onPlay={togglePlay}
        onReplay={replay}
        onSeek={seek}
      />

      <div className="flex items-center gap-4">
        <Volume2 className="size-5" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          className="w-36"
        />
      </div>
    </div>
  )
}

export default PlayerPanel

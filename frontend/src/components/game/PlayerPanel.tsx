import useSession from "@/hooks/useSession"
import { Volume2 } from "lucide-react"
import useAudioPlayer from "@/hooks/useAudioPlayer"
import DiscPlayer from "./DiscPlayer"

const PlayerPanel = () => {
  const { data: session, isLoading } = useSession()

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
  } = useAudioPlayer({ src: session?.clipUrl })

  const disabled = isLoading || !session
  console.log("clipUrl:", session?.clipUrl)

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <audio ref={audioRef} />

      <DiscPlayer
        hasEnded={hasEnded}
        isPlaying={isPlaying}
        progress={progress}
        onPlay={togglePlay}
        onReplay={replay}
        onSeek={seek}
        disabled={disabled}
      />

      <div className="z-10 flex items-center gap-3">
        <Volume2 className="size-5 shrink-0" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => setVolume(Number(event.target.value))}
          disabled={disabled}
          className="w-36 cursor-pointer accent-primary disabled:cursor-not-allowed"
        />
      </div>
    </div>
  )
}

export default PlayerPanel

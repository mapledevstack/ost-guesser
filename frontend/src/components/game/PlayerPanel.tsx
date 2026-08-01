import useSession from "@/hooks/useSession"
import { Volume2 } from "lucide-react"
import useAudioPlayer from "@/hooks/useAudioPlayer"
import DiscPlayer from "./DiscPlayer"
import { SiYoutubemusic } from "react-icons/si"
import { cn } from "@/utils/cn"

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

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <div className="absolute top-16 z-10 text-3xl font-extrabold tracking-wide text-sidebar-primary flex items-center gap-4">
        <h1>{session?.answer?.title}</h1>
        <a href={`https://www.youtube.com/watch?v=${session?.answer?.id}`} target="_blank" rel="noopener noreferrer" className={cn("hidden", session?.answer?.id && "block")}>
          <SiYoutubemusic className="size-10 text-red-500" />
        </a>
      </div>

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

      <div className="z-10 flex flex-col items-center gap-6 ">
        <div className="flex items-center gap-3 justify-center">
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
    </div>
  )
}

export default PlayerPanel

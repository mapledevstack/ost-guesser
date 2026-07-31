import useSession from "@/hooks/useSession"
import { useAudioPlayer } from "@/hooks/useAudioPlayer"
import { Button } from "../ui/button"
import { Pause, Play, RotateCcw, Volume2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

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
    handleVolumeChange,
    handlePlay,
    handlePause,
    handleEnded,
    seek,
  } = useAudioPlayer()

  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  const handleCircleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()

    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)

    let angle = Math.atan2(y, x)

    let degrees = (angle * 180) / Math.PI

    degrees += 90

    if (degrees < 0) {
      degrees += 360
    }

    const progress = degrees / 360

    seek(progress)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <audio
        ref={audioRef}
        src={session.clipUrl}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      <div className="relative size-80">
        <svg
          className="absolute inset-0 size-full -rotate-90"
          viewBox="0 0 100 100"
          onClick={handleCircleClick}
        >
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="#1f2937"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: offset,
            }}
          />
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  onClick={hasEnded ? replay : togglePlay}
                  className="size-12 rounded-full"
                >
                  {isPlaying ? (
                    <Pause className="size-5" />
                  ) : hasEnded ? (
                    <RotateCcw className="size-5" />
                  ) : (
                    <Play className="size-5" />
                  )}
                </Button>
              }
            />

            <TooltipContent>
              <div className="flex items-center gap-2">
                <span>Play</span>

                <div className="flex items-center gap-1">
                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-medium text-primary-foreground shadow-sm">
                    Ctrl
                  </kbd>

                  <span>+</span>

                  <kbd className="rounded border bg-muted px-1.5 py-0.5 text-xs font-medium text-primary-foreground shadow-sm">
                    Space
                  </kbd>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Volume2 className="size-5" />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(event) => handleVolumeChange(Number(event.target.value))}
          className="w-36"
        />
      </div>
    </div>
  )
}

export default PlayerPanel

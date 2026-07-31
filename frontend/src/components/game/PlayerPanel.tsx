import useSession from "@/hooks/useSession"
import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Pause, Play, RotateCcw, Volume2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const PlayerPanel = () => {
  const { data: session, isLoading } = useSession()

  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [progress, setProgress] = useState(0)
  const [hasEnded, setHasEnded] = useState(false)

  const togglePlay = () => {
    if (!audioRef.current) return

    if (audioRef.current.paused) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.ctrlKey) {
        e.preventDefault()
        togglePlay()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (isLoading || !session) return null

  const handleTimeUpdate = () => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return

    setProgress(audio.currentTime / audio.duration)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value)

    setVolume(newVolume)

    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setHasEnded(true)
    setProgress(1)
  }

  const replay = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = 0
    setProgress(0)
    setHasEnded(false)
    audio.play()
  }

  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <audio
        ref={audioRef}
        src={session.clipUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />

      <div className="relative size-80">
        <svg
          className="absolute inset-0 size-full -rotate-90"
          viewBox="0 0 100 100"
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
          onChange={handleVolumeChange}
          className="w-36"
        />
      </div>
    </div>
  )
}

export default PlayerPanel

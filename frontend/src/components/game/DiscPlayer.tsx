import { Pause, Play, RotateCcw } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import useSession from "@/hooks/useSession"
import { getAlbumCoverUrl } from "@/utils/helpers"

type Props = {
  progress: number
  maxProgress: number
  isPlaying: boolean
  hasEnded: boolean
  onPlay: () => void
  onReplay: () => void
  onSeek: (progress: number) => void
  disabled: boolean
}

const DiscPlayer = ({
  progress,
  maxProgress,
  isPlaying,
  hasEnded,
  onPlay,
  onReplay,
  onSeek,
  disabled,
}: Props) => {
  const { data: session } = useSession()

  const albumId = session?.answer?.albumId
  const coverUrl = getAlbumCoverUrl(albumId || "")

  const radius = 44
  const circumference = 2 * Math.PI * radius

  const progressOffset = circumference * (1 - progress)
  const maxProgressOffset = circumference * (1 - maxProgress)

  const handleCircleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()

    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)

    const distance = Math.sqrt(x * x + y * y)
    const vinylRadius = rect.width * 0.44

    if (distance > vinylRadius) {
      return
    }

    let degrees = (Math.atan2(y, x) * 180) / Math.PI

    degrees += 90

    if (degrees < 0) {
      degrees += 360
    }

    onSeek(degrees / 360)
  }

  return (
    <div className="relative size-120">
      {/* Vinyl + album cover */}
      <div
        className="absolute inset-[6%] size-[88%]"
        style={{
          animation: "spin 24s linear infinite",
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        {/* Vinyl */}
        <img
          src="/images/vinyl.webp"
          alt="vinyl"
          className="absolute inset-0 size-full object-contain"
        />

        {/* Album cover */}
        {albumId && (
          <img
            src={coverUrl}
            alt=""
            className="absolute top-1/2 left-1/2 size-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
          />
        )}
      </div>

      {/* Progress ring */}
      <svg
        className="absolute inset-0 size-full -rotate-90 cursor-pointer"
        viewBox="0 0 100 100"
        onClick={handleCircleClick}
      >
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="2"
          className="text-muted/30"
        />

        {/* Reveal limit */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-sidebar-primary/20"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: maxProgressOffset,
          }}
        />

        {/* Current progress */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: progressOffset,
          }}
        />
      </svg>

      {/* Center controls */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Tooltip>
          <TooltipTrigger
            render={
              <Button
                onClick={hasEnded ? onReplay : onPlay}
                className="size-14 rounded-full bg-sidebar-primary/50"
                disabled={disabled}
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
  )
}

export default DiscPlayer

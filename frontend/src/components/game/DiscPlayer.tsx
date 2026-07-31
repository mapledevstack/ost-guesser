import { Pause, Play, RotateCcw } from "lucide-react"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

type Props = {
  progress: number
  isPlaying: boolean
  hasEnded: boolean
  onPlay: () => void
  onReplay: () => void
  onSeek: (progress: number) => void
  disabled: boolean
}

const DiscPlayer = ({
  progress,
  isPlaying,
  hasEnded,
  onPlay,
  onReplay,
  onSeek,
  disabled,
}: Props) => {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - progress)

  const handleCircleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()

    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)

    let degrees = (Math.atan2(y, x) * 180) / Math.PI

    degrees += 90

    if (degrees < 0) {
      degrees += 360
    }

    onSeek(degrees / 360)
  }

  return (
    <div className="relative size-96">
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
                onClick={hasEnded ? onReplay : onPlay}
                className="size-12 rounded-full"
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

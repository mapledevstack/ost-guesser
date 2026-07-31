import type { GameMode } from "@/providers/game-provider"
import { Button } from "../ui/button"
import { useNavigate } from "@tanstack/react-router"
import { motion } from "motion/react"
import { cn } from "@/utils/cn"

type Props = {
  mode: GameMode
}
const Mode = ({ mode }: Props) => {
  const navigate = useNavigate()

  return (
    <div className="flex w-lg items-center justify-around rounded-lg bg-muted p-1">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/" })}
        className={cn(
          "relative flex-1",
          mode === "daily"
            ? "text-primary-foreground hover:text-primary-foreground"
            : "text-muted-foreground"
        )}
      >
        {mode === "daily" && (
          <motion.div
            layoutId="mode-tab"
            className="absolute inset-0 rounded-md bg-primary"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}

        <span className="relative z-10 tracking-wider uppercase">Daily</span>
      </Button>

      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/endless" })}
        className={cn(
          "relative flex-1",
          mode === "endless"
            ? "text-primary-foreground hover:text-primary-foreground"
            : "text-muted-foreground"
        )}
      >
        {mode === "endless" && (
          <motion.div
            layoutId="mode-tab"
            className="absolute inset-0 rounded-md bg-primary"
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}

        <span className="relative z-10 tracking-wider uppercase">Endless</span>
      </Button>
    </div>
  )
}
export default Mode

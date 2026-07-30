import GamePage from "@/pages/GamePage"
import { GameProvider } from "@/providers/game-provider"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: () => (
    <GameProvider mode="daily">
      <GamePage />
    </GameProvider>
  ),
})

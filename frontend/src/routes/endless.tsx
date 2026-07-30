import GamePage from "@/pages/GamePage"
import { GameProvider } from "@/providers/game-provider"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/endless")({
  component: () => (
    <GameProvider mode="endless">
      <GamePage />
    </GameProvider>
  ),
})

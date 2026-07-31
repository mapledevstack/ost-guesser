import api from "@/config/axios"
import type { GameMode } from "@/providers/game-provider"
import { SessionSchema } from "@/schema/gameSchema"

export const getSession = async (mode: GameMode) => {
  const res = await api.get(`/game/${mode}`)

  return SessionSchema.parse(res.data)
}

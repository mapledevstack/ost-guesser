import api from "@/config/axios"
import type { GameMode } from "@/providers/game-provider"
import { SearchEntitiesSchema, SessionSchema } from "@/schema/gameSchema"

export const getSession = async (mode: GameMode) => {
  const res = await api.get(`/game/${mode}`)

  return SessionSchema.parse(res.data)
}

export const search = async (query: string) => {
  const res = await api.get(`/game/search?q=${query}`)

  return SearchEntitiesSchema.parse(res.data)
}

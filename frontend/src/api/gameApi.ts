import api from "@/config/axios"
import type { GameMode } from "@/providers/game-provider"
import {
  AlbumsCoversSchema,
  SearchEntitiesSchema,
  SessionSchema,
  type Guess,
} from "@/schema/gameSchema"

export const getSession = async (mode: GameMode) => {
  const res = await api.get(`/game/${mode}`)

  return SessionSchema.parse(res.data)
}

export const search = async (query: string) => {
  const res = await api.get(`/game/search?q=${query}`)

  return SearchEntitiesSchema.parse(res.data)
}

export const getAlbums = async () => {
  const res = await api.get(`/game/albums`)

  return AlbumsCoversSchema.parse(res.data)
}

export const postGuess = async (
  mode: GameMode,
  sessionId: string,
  guesses: Guess[]
) => {
  const res = await api.post(`/game/${mode}/guess`, {
    sessionId,
    guesses,
  })

  return SessionSchema.parse(res.data)
}

export const startNextEndlessGame = async () => {
  const res = await api.post("/game/endless/next")

  return SessionSchema.parse(res.data)
}

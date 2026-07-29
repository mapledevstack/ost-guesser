import { SUPABASE_URL } from "../constants/env.js"
import {
  createDailyGame,
  getDailyGameByDate,
  getRandomTrack,
  searchEntities,
} from "../db/queries/game.queries.js"
import type { CompleteDailyGameType } from "../schema/game.schema.js"

export const searchService = async (query: string) => {
  const { rows } = await searchEntities(query)

  return rows
}

export const getDailyGameService = async () => {
  const today = new Intl.DateTimeFormat("en-CA").format(new Date())

  let dailyGame = await getDailyGameByDate(today)

  if (!dailyGame) {
    const track = await getRandomTrack()

    await createDailyGame({
      date: today,
      trackId: track.id,
    })

    dailyGame = {
      date: today,
      trackId: track.id,
    }
  }

  const clipUrl = `${SUPABASE_URL}/${dailyGame.trackId}.mp3`

  return { clipUrl }
}

export const completeDailyGame = async ({
  guesses,
}: CompleteDailyGameType) => {}

export const getEndlessGameService = async () => {
  const track = await getRandomTrack()

  const clipUrl = `${SUPABASE_URL}/${track.id}.mp3`

  return { clipUrl }
}

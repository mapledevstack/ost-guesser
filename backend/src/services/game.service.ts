import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { SUPABASE_URL } from "../constants/env.js"
import { NOT_FOUND } from "../constants/http.js"
import {
  getDailyGameByDate,
  searchEntities,
} from "../db/queries/game.queries.js"
import appAssert from "../utils/appAssert.js"

export const getDailyGameService = async () => {
  const today = new Intl.DateTimeFormat("en-CA").format(new Date())
  const dailyGame = await getDailyGameByDate(today!)

  appAssert(
    dailyGame,
    NOT_FOUND,
    "Daily game not found",
    ERROR_CODES.DAILY_GAME_NOT_FOUND,
  )

  const clipUrl = `${SUPABASE_URL}/${dailyGame.trackId}.mp3`

  return { clipUrl }
}

export const searchService = async (query: string) => {
  const { rows } = await searchEntities(query)

  return rows
}

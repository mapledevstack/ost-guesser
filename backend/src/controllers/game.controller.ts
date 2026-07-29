import { OK } from "../constants/http.js"
import {
  CompleteDailyGameSchema,
  searchQuerySchema,
} from "../schema/game.schema.js"
import {
  completeDailyGame,
  getDailyGameService,
  getEndlessGameService,
  searchService,
} from "../services/game.service.js"
import catchErrors from "../utils/catchErrors.js"

export const searchController = catchErrors(async (req, res) => {
  const { q } = searchQuerySchema.parse(req.query)

  const results = await searchService(q)

  return res.status(OK).json(results)
})

export const getDailyGameController = catchErrors(async (_req, res) => {
  const clipUrl = await getDailyGameService()

  return res.status(OK).json(clipUrl)
})

export const completeDailyGameController = catchErrors(async (req, res) => {
  const { guesses } = CompleteDailyGameSchema.parse(req.body)

  const result = await completeDailyGame({
    auth: req.auth,
    guesses,
  })

  res.json(result)
})
export const getEndlessGameController = catchErrors(async (_req, res) => {
  const clipUrl = await getEndlessGameService()

  return res.status(OK).json(clipUrl)
})

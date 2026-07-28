import { OK } from "../constants/http.js"
import { searchQuerySchema } from "../schema/game.schema.js"
import {
  getDailyGameService,
  getEndlessGameService,
  searchService,
} from "../services/game.service.js"
import catchErrors from "../utils/catchErrors.js"

export const getDailyGameController = catchErrors(async (_req, res) => {
  const clipUrl = await getDailyGameService()

  return res.status(OK).json(clipUrl)
})

export const getEndlessGameController = catchErrors(async (_req, res) => {
  const clipUrl = await getEndlessGameService()

  return res.status(OK).json(clipUrl)
})

export const searchController = catchErrors(async (req, res) => {
  const { q } = searchQuerySchema.parse(req.query)

  const results = await searchService(q)

  return res.status(OK).json(results)
})

import { OK } from "../constants/http.js"
import { GameModeSchema } from "../schema/auth.schema.js"
import {
  GuessGameRequestSchema,
  searchQuerySchema,
} from "../schema/game.schema.js"
import {
  searchService,
  processGuess,
  startGameService,
} from "../services/game.service.js"
import catchErrors from "../utils/catchErrors.js"

export const searchController = catchErrors(async (req, res) => {
  const { q } = searchQuerySchema.parse(req.query)

  const results = await searchService(q)

  return res.status(OK).json(results)
})

export const startGameController = catchErrors(async (req, res) => {
  const mode = GameModeSchema.parse(req.params.mode)
  const playerIdentity = req.auth

  const { sessionId, clipUrl } = await startGameService({
    mode,
    playerIdentity,
  })

  return res.status(OK).json({ sessionId, clipUrl })
})

export const guessGameController = catchErrors(async (req, res) => {
  const mode = GameModeSchema.parse(req.params.mode)
  const playerIdentity = req.auth
  const { sessionId, guess } = GuessGameRequestSchema.parse(req.body)

  const result = await processGuess({
    sessionId,
    guess,
    playerIdentity,
  })

  return res.status(OK).json(result)
})

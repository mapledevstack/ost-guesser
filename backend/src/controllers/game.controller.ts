import { OK } from "../constants/http.js"
import { getDailyGameService } from "../services/game.service.js"
import catchErrors from "../utils/catchErrors.js"

export const getDailyGameController = catchErrors(async (_req, res) => {
  const clipUrl = await getDailyGameService()

  return res.status(OK).json(clipUrl)
})

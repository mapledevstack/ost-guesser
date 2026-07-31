import type { RequestHandler } from "express"
import { CLIENT_URL } from "../constants/env.js"
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js"
import { clearAuthCookies, setAuthCookies } from "../utils/cookies.js"
import appAssert from "../utils/appAssert.js"
import { NO_CONTENT, UNAUTHORIZED } from "../constants/http.js"
import catchErrors from "../utils/catchErrors.js"
import { getUserById } from "../db/queries/user.queries.js"
import { refreshAccessToken } from "../services/auth.service.js"

export const googleCallbackController: RequestHandler = (req, res) => {
  appAssert(req.user, UNAUTHORIZED, "User not found")

  const { id } = req.user

  const accessToken = signAccessToken({ userId: id })
  const refreshToken = signRefreshToken({ userId: id })

  return setAuthCookies({ res, accessToken, refreshToken }).redirect(CLIENT_URL)
}

export const logoutController: RequestHandler = (_req, res) => {
  clearAuthCookies(res)

  return res.sendStatus(NO_CONTENT)
}

export const refreshAccessTokenController = catchErrors(async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  appAssert(refreshToken, UNAUTHORIZED, "Refresh token not found")

  const { refreshToken: newRefreshToken, accessToken } =
    await refreshAccessToken(refreshToken)

  setAuthCookies({
    res,
    accessToken,
    refreshToken: newRefreshToken,
  })

  return res.sendStatus(NO_CONTENT)
})

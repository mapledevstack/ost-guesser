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
  const refreshToken = req.cookies.refreshToken as string | undefined

  appAssert(refreshToken, UNAUTHORIZED, "Refresh token not found")

  const { userId } = verifyRefreshToken(refreshToken)

  const user = await getUserById(userId)

  appAssert(user, UNAUTHORIZED, "User not found")

  const accessToken = signAccessToken({ userId: user.id })
  const newRefreshToken = signRefreshToken({ userId: user.id })

  return setAuthCookies({
    res,
    accessToken,
    refreshToken: newRefreshToken,
  }).sendStatus(NO_CONTENT)
})

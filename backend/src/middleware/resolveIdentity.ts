import type { RequestHandler } from "express"
import { verifyAccessToken } from "../utils/jwt.js"
import { refreshAccessToken } from "../services/auth.service.js"
import { setAuthCookies } from "../utils/cookies.js"
import resolveGuest from "./resolveGuest.js"

const resolveIdentity: RequestHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined
  const refreshToken = req.cookies.refreshToken as string | undefined

  if (accessToken) {
    try {
      const { userId } = verifyAccessToken(accessToken)

      req.auth = {
        type: "user",
        userId,
      }

      return next()
    } catch {
      // Access token expired/invalid.
      // Try refresh below.
    }
  }

  if (refreshToken) {
    try {
      const {
        refreshToken: newRefreshToken,
        accessToken: newAccessToken,
        user,
      } = await refreshAccessToken(refreshToken)

      setAuthCookies({
        res,
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      })

      req.auth = {
        type: "user",
        userId: user.id,
      }

      return next()
    } catch {
      // Refresh failed. Fall through to guest.
    }
  }

  return resolveGuest(req, res, next)
}

export default resolveIdentity

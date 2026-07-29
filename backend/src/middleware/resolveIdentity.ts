import type { RequestHandler } from "express"
import crypto from "node:crypto"
import { verifyAccessToken } from "../utils/jwt.js"
import { setGuestCookie } from "../utils/cookies.js"

const resolveIdentity: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined

  if (accessToken) {
    const { userId } = verifyAccessToken(accessToken)

    req.auth = {
      type: "user",
      userId,
    }

    return next()
  }

  let guestId = req.cookies.guestId as string | undefined

  if (!guestId) {
    guestId = crypto.randomUUID()
    setGuestCookie(res, guestId)
  }

  req.auth = {
    type: "guest",
    guestId,
  }

  next()
}

export default resolveIdentity

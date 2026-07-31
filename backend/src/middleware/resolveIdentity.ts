import type { RequestHandler } from "express"
import { verifyAccessToken } from "../utils/jwt.js"
import { resolveGuest } from "./resolveGuest.js"

const resolveIdentity: RequestHandler = async (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined

  if (accessToken) {
    const { userId } = verifyAccessToken(accessToken)

    req.auth = {
      type: "user",
      userId,
    }

    return next()
  }

  return resolveGuest(req, res, next)
}

export default resolveIdentity

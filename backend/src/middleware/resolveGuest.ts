import type { RequestHandler } from "express"
import { setGuestCookie } from "../utils/cookies.js"
import {
  createGuestService,
  findGuestByIdService,
} from "../services/user.service.js"

export const resolveGuest: RequestHandler = async (req, res, next) => {
  const guestId = req.cookies.guestId as string | undefined

  if (guestId) {
    const guest = await findGuestByIdService(guestId)

    if (guest) {
      req.auth = {
        type: "guest",
        guestId: guest.id,
      }

      return next()
    }
  }

  const guest = await createGuestService()

  setGuestCookie(res, guest.id)

  req.auth = {
    type: "guest",
    guestId: guest.id,
  }

  return next()
}

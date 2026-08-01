import type { Request } from "express"
import appAssert from "./appAssert.js"
import { FORBIDDEN } from "../constants/http.js"
import type { PlayerIdentityType } from "../schema/auth.schema.js"

export const getAuthUser = (req: Request) => {
  const { type } = req.auth

  appAssert(type === "user", FORBIDDEN, "Unauthorized")

  const userId = req.auth.userId

  return userId
}

export const getPlayerIds = (playerIdentity: PlayerIdentityType) => ({
  userId: playerIdentity.type === "user" ? playerIdentity.userId : null,
  guestId: playerIdentity.type === "guest" ? playerIdentity.guestId : null,
})

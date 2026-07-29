import type { Request } from "express"
import appAssert from "./appAssert.js"
import { FORBIDDEN } from "../constants/http.js"

export const getAuthUser = (req: Request) => {
  const { type } = req.auth

  appAssert(type === "user", FORBIDDEN, "Unauthorized")

  const userId = req.auth.userId

  return userId
}

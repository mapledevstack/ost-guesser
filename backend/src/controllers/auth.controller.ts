import type { RequestHandler } from "express"
import { CLIENT_URL } from "../constants/env.js"

export const googleCallbackController: RequestHandler = (req, res) => {
  console.log("user", req.user)

  res.redirect(CLIENT_URL)
}

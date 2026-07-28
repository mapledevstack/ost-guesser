import type { RequestHandler } from "express"
import passport from "passport"

export const googleAuthController: RequestHandler = (req, res, next) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next)
}

export const googleCallbackController: RequestHandler = (req, res) => {
  // req.user is available
  // res.redirect(...)
}

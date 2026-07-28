import { Router } from "express"
import passport from "passport"
import {
  getCurrentUserController,
  googleCallbackController,
  logoutController,
  refreshAccessTokenController,
} from "../controllers/auth.controller.js"
import { CLIENT_URL } from "../constants/env.js"

const router = Router()

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: CLIENT_URL,
  }),
  googleCallbackController,
)

router.get("/refresh", refreshAccessTokenController)

router.post("/logout", logoutController)

router.get("/me", getCurrentUserController)

export default router

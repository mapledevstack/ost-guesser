import { Router } from "express"
import passport from "passport"
import {
  googleAuthController,
  googleCallbackController,
} from "../controllers/auth.controller.js"

const router = Router()

router.get("/google", googleAuthController)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  googleCallbackController,
)
export default router

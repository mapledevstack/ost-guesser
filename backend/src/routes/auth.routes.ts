import { Router } from "express"
import passport from "passport"
import { googleCallbackController } from "../controllers/auth.controller.js"

const router = Router()

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
)

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackController,
)
export default router

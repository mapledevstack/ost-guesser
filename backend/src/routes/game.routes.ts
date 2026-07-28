import { Router } from "express"
import { getDailyGameController } from "../controllers/game.controller.js"

const router = Router()

router.get("/daily", getDailyGameController)

export default router

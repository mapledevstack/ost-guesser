import { Router } from "express"
import {
  completeDailyGameController,
  getDailyGameController,
  getEndlessGameController,
  searchController,
} from "../controllers/game.controller.js"

const router = Router()

router.get("/search", searchController)

router.get("/daily", getDailyGameController)
router.post("/daily/complete", completeDailyGameController)

router.get("/endless", getEndlessGameController)

export default router

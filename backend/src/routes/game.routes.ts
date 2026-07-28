import { Router } from "express"
import {
  getDailyGameController,
  getEndlessGameController,
  searchController,
} from "../controllers/game.controller.js"

const router = Router()

router.get("/daily", getDailyGameController)
router.get("/endless", getEndlessGameController)
router.get("/search", searchController)

export default router

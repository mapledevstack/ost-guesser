import { Router } from "express"
import {
  getDailyGameController,
  searchController,
} from "../controllers/game.controller.js"

const router = Router()

router.get("/daily", getDailyGameController)
router.get("/search", searchController)

export default router

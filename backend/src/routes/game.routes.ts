import { Router } from "express"
import {
  guessGameController,
  searchController,
  startGameController,
} from "../controllers/game.controller.js"

const router = Router()

router.get("/search", searchController)

router.get("/:mode", startGameController)
router.post("/:mode/guess", guessGameController)

export default router

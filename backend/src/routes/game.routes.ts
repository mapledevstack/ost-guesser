import { Router } from "express"
import {
  getAlbumsController,
  getGameController,
  guessGameController,
  searchController,
} from "../controllers/game.controller.js"

const router = Router()

router.get("/search", searchController)
router.get("/albums", getAlbumsController)

router.get("/:mode", getGameController)
router.post("/:mode/guess", guessGameController)

export default router

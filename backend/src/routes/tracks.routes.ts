import { Router } from "express"
import { getTrackController } from "../controllers/tracks.controller.js"

const router = Router()

router.get("/:trackId", getTrackController)

export default Router

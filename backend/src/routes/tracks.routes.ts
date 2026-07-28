import { Router } from "express"
import { getTrackController } from "../controllers/tracks.controller.js"

const routes = Router()

routes.get("/:trackId", getTrackController)

export default routes

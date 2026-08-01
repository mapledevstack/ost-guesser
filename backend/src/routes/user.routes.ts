import { Router } from "express"
import {
  getMeController,
  updateMeController,
} from "../controllers/user.controller.js"

const router = Router()

router.get("/me", getMeController)
router.patch("/me", updateMeController)

export default router

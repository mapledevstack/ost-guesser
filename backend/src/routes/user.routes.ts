import { Router } from "express"
import {
  getUserController,
  updateProfile,
} from "../controllers/user.controller.js"

const router = Router()

router.get("/me", getUserController)
router.patch("/me", updateProfile)

export default router

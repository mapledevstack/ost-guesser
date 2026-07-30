import { Router } from "express"
import {
  getProfileController,
  updateProfile,
} from "../controllers/user.controller.js"

const router = Router()

router.get("/me", getProfileController)
router.patch("/me", updateProfile)

export default router

import { Router } from "express"
import {
  getProfileController,
  getUserIdentityController,
  updateProfile,
} from "../controllers/user.controller.js"

const router = Router()

router.get("/me", getUserIdentityController)

router.get("/profile", getProfileController)
router.patch("/profile", updateProfile)

export default router

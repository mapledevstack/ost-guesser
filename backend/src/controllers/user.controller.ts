import { OK } from "../constants/http.js"
import { getAuthUser } from "../utils/auth.js"
import catchErrors from "../utils/catchErrors.js"
import { UpdateProfileSchema } from "../schema/user.schema.js"
import {
  getUserByIdService,
  updateProfileService,
} from "../services/user.service.js"
import type { RequestHandler } from "express"

export const getUserIdentityController: RequestHandler = (req, res) => {
  return res.status(OK).json(req.auth)
}

export const getProfileController = catchErrors(async (req, res) => {
  const userId = getAuthUser(req)

  const user = await getUserByIdService(userId)

  return res.status(OK).json(user)
})

export const updateProfile = catchErrors(async (req, res) => {
  const userId = getAuthUser(req)
  const { displayName, avatarUrl } = UpdateProfileSchema.parse(req.body)

  const values = {
    ...(displayName && { displayName }),
    ...(avatarUrl && { avatarUrl }),
  }

  await updateProfileService(userId, values)

  return res.status(OK).json(userId)
})

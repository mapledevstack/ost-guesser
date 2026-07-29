import type { RequestHandler } from "express"
import { OK } from "../constants/http.js"
import { getAuthUser } from "../utils/auth.js"
import catchErrors from "../utils/catchErrors.js"
import { UpdateProfileSchema } from "../schema/user.schema.js"
import { updateProfileService } from "../services/user.service.js"

export const getUserController: RequestHandler = (req, res) => {
  const userId = getAuthUser(req)

  return res.status(OK).json(userId)
}

export const updateProfile = catchErrors(async (req, res) => {
  const userId = getAuthUser(req)
  const { displayName, avatarUrl } = UpdateProfileSchema.parse(req.body)

  const values = {
    ...(displayName !== undefined && { displayName }),
    ...(avatarUrl !== undefined && { avatarUrl }),
  }

  await updateProfileService(userId, values)

  return res.status(OK).json(userId)
})

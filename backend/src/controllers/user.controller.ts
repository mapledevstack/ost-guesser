import { OK } from "../constants/http.js"
import { getAuthUser } from "../utils/auth.js"
import catchErrors from "../utils/catchErrors.js"
import { UpdateProfileSchema } from "../schema/user.schema.js"
import {
  getGuestByIdService,
  getUserByIdService,
  updateMeService,
} from "../services/user.service.js"

export const getMeController = catchErrors(async (req, res) => {
  const type = req.auth.type

  const profile =
    type === "guest"
      ? await getGuestByIdService(req.auth.guestId)
      : await getUserByIdService(req.auth.userId)

  return res.status(OK).json({
    type,
    ...profile,
  })
})

export const updateMeController = catchErrors(async (req, res) => {
  const userId = getAuthUser(req)
  const { displayName, avatarUrl } = UpdateProfileSchema.parse(req.body)

  const values = {
    ...(displayName && { displayName }),
    ...(avatarUrl && { avatarUrl }),
  }

  await updateMeService(userId, values)

  return res.sendStatus(204)
})

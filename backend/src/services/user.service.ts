import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { NOT_FOUND } from "../constants/http.js"
import {
  createGuest,
  getGuestById,
  getUserById,
  updateUser,
} from "../db/queries/user.queries.js"
import appAssert from "../utils/appAssert.js"

export const getUserByIdService = async (userId: string) => {
  const user = await getUserById(userId)

  appAssert(user, NOT_FOUND, "User not found", ERROR_CODES.USER_NOT_FOUND)

  return {
    id: user.id,
    displayName: user.displayName,
    avatarUrl: user.avatarUrl,
    email: user.email,
    gameStats: user.gameStats,
  }
}

export const getGuestByIdService = async (guestId: string) => {
  const guest = await getGuestById(guestId)

  appAssert(guest, NOT_FOUND, "Guest not found", ERROR_CODES.GUEST_NOT_FOUND)

  return {
    id: guest.id,
    displayName: null,
    avatarUrl: null,
    email: null,
    gameStats: guest.gameStats,
  }
}

export const findGuestByIdService = async (guestId: string) => {
  return await getGuestById(guestId)
}

type UpdateProfileServiceType = {
  displayName?: string
  avatarUrl?: string
}

export const updateMeService = async (
  userId: string,
  { displayName, avatarUrl }: UpdateProfileServiceType,
) => {
  const user = await getUserById(userId)

  appAssert(user, NOT_FOUND, "User not found", ERROR_CODES.USER_NOT_FOUND)

  const values = {
    ...(displayName !== undefined && { displayName }),
    ...(avatarUrl !== undefined && { avatarUrl }),
  }

  await updateUser(userId, values)
}

export const createGuestService = async () => {
  const id = crypto.randomUUID()

  return createGuest({ id })
}

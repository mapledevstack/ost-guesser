import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { NOT_FOUND } from "../constants/http.js"
import { getUserById, updateUser } from "../db/queries/user.queries.js"
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

type UpdateProfileServiceType = {
  displayName?: string
  avatarUrl?: string
}

export const updateProfileService = async (
  userId: string,
  { displayName, avatarUrl }: UpdateProfileServiceType,
) => {
  const user = await getUserById(userId)

  appAssert(user, NOT_FOUND, "User not found", ERROR_CODES.USER_NOT_FOUND)

  const values = {
    ...(displayName !== undefined && { displayName }),
    ...(avatarUrl !== undefined && { avatarUrl }),
  }

  const updatedUser = await updateUser(userId, values)

  return {
    id: updatedUser.id,
    displayName: updatedUser.displayName,
    avatarUrl: updatedUser.avatarUrl,
  }
}

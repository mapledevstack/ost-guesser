import type { Profile } from "passport"
import appAssert from "../utils/appAssert.js"
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "../constants/http.js"
import { ERROR_CODES } from "../constants/appErrorCodes.js"
import {
  createUser,
  getUserByGoogleId,
  getUserById,
} from "../db/queries/user.queries.js"
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.js"

export const handleGoogleLogin = async (profile: Profile) => {
  const googleId = profile.id
  const email = profile.emails?.[0]?.value

  appAssert(
    email,
    INTERNAL_SERVER_ERROR,
    "Email not found",
    ERROR_CODES.EMAIL_NOT_FOUND,
  )

  let user = await getUserByGoogleId(googleId)

  if (!user) {
    user = await createUser({ googleId, email })
  }

  return user
}

export const refreshAccessToken = async (refreshToken: string) => {
  const { userId } = verifyRefreshToken(refreshToken)

  const user = await getUserById(userId)
  appAssert(user, UNAUTHORIZED, "User not found")

  const accessToken = signAccessToken({ userId: user.id })
  const newRefreshToken = signRefreshToken({ userId: user.id })

  return {
    user,
    accessToken,
    refreshToken: newRefreshToken,
  }
}

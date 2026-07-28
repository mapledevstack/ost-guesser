import type { Profile } from "passport"
import appAssert from "../utils/appAssert.js"
import { INTERNAL_SERVER_ERROR } from "../constants/http.js"
import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { createUser, getUserByGoogleId } from "../db/queries/user.queries.js"

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

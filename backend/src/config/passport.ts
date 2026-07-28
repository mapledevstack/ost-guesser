import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import {
  API_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../constants/env.js"
import { handleGoogleLogin } from "../services/auth.service.js"

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${API_URL}/api/v1/auth/google/callback`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const user = await handleGoogleLogin(profile)

        done(null, user)
      } catch (error) {
        done(error as Error)
      }
    },
  ),
)

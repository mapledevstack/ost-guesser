import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../constants/env.js"

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // We'll implement this later.
      console.log(profile)

      return done(null, profile)
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user as Express.User)
})

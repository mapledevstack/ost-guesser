import jwt from "jsonwebtoken"
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js"
import AppError from "./AppError.js"
import { UNAUTHORIZED } from "../constants/http.js"

type TokenPayload = {
  userId: string
}

export const signAccessToken = (payload: TokenPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "5s" })

export const signRefreshToken = (payload: TokenPayload) =>
  jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "15d" })

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    throw new AppError(UNAUTHORIZED, "Invalid access token")
  }
}

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload
  } catch (error) {
    throw new AppError(UNAUTHORIZED, "Invalid refresh token")
  }
}

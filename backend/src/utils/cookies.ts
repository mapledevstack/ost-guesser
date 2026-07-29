import type { CookieOptions, Response } from "express"
import { NODE_ENV } from "../constants/env.js"
import { FIFTEEN_DAYS_MS, FIFTEEN_MINUTES_MS } from "./time.js"

const defaults: CookieOptions = {
  sameSite: "strict",
  httpOnly: true,
  secure: NODE_ENV === "production",
}

const accessTokenCookieOptions: CookieOptions = {
  ...defaults,
  maxAge: FIFTEEN_MINUTES_MS,
}

const refreshTokenCookieOptions: CookieOptions = {
  ...defaults,
  maxAge: FIFTEEN_DAYS_MS,
  path: "/api/v1/auth/refresh",
}

const guestCookieOptions: CookieOptions = {
  ...defaults,
}

type Params = {
  res: Response
  accessToken: string
  refreshToken: string
}

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
  res
    .cookie("accessToken", accessToken, accessTokenCookieOptions)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)

export const clearAuthCookies = (res: Response) =>
  res
    .clearCookie("accessToken", accessTokenCookieOptions)
    .clearCookie("refreshToken", refreshTokenCookieOptions)

export const setGuestCookie = (res: Response, guestId: string) =>
  res.cookie("guestId", guestId, guestCookieOptions)

export const clearGuestCookie = (res: Response) =>
  res.clearCookie("guestId", guestCookieOptions)

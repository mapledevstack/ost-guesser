import "dotenv/config"
import z from "zod"

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue

  if (!value) {
    if (defaultValue !== undefined) {
      return defaultValue
    }

    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

const nodeEnvSchema = z
  .enum(["development", "production", "test"])
  .default("development")

export const PORT = getEnv("PORT", "3000")
export const NODE_ENV = nodeEnvSchema.parse(getEnv("NODE_ENV"))
export const CLIENT_URL = getEnv("CLIENT_URL", "http://localhost:5173")
export const API_URL = getEnv("API_URL", "http://localhost:3000")
export const DATABASE_URL = getEnv("DATABASE_URL")

export const JWT_SECRET = getEnv("JWT_SECRET")
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET")

export const YOUTUBE_API_KEY = getEnv("YOUTUBE_API_KEY")

export const GOOGLE_CLIENT_ID = getEnv("GOOGLE_CLIENT_ID")
export const GOOGLE_CLIENT_SECRET = getEnv("GOOGLE_CLIENT_SECRET")

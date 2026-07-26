import "dotenv/config"
import z from "zod"

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] ?? defaultValue

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

const nodeEnvSchema = z
  .enum(["development", "production", "test"])
  .default("development")

export const PORT = getEnv("PORT", "3000")
export const NODE_ENV = nodeEnvSchema.parse(getEnv("NODE_ENV"))
export const DATABASE_URL = getEnv("DATABASE_URL")

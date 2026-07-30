const getEnv = (key: keyof ImportMetaEnv, defaultValue?: string): string => {
  const value = import.meta.env[key] ?? defaultValue

  if (!value) {
    if (value === "") {
      return defaultValue ?? ""
    }
    throw new Error(`Missing environment variable: ${key}`)
  }

  return value
}

export const API_BASE_URL = getEnv(
  "VITE_API_BASE_URL",
  "http://localhost:3000/api/v1"
)

export const IS_DEV = import.meta.env.DEV

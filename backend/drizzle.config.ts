import { defineConfig } from "drizzle-kit"
import { DATABASE_URL } from "./src/constants/env.js"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",

  schemaFilter: ["public"],

  dbCredentials: {
    url: DATABASE_URL,
  },

  verbose: true,
  strict: true,
})

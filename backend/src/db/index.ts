import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import { DATABASE_URL } from "../constants/env.js"
import relations from "./relations.js"

export const pool = new Pool({
  connectionString: DATABASE_URL,
})

const db = drizzle({ client: pool, relations })

export default db

import { drizzle } from "drizzle-orm/node-postgres"
import { DATABASE_URL } from "../constants/env.js"

const db = drizzle(DATABASE_URL)

export default db

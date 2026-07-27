import { drizzle } from "drizzle-orm/node-postgres"
import { DATABASE_URL } from "../constants/env.js"
import relations from "./relations.js"

const db = drizzle(DATABASE_URL, { relations })

export default db

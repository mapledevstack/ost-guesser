import { sql } from "drizzle-orm"
import db from "./index.js"

const connectDB = async () => {
  try {
    await db.execute(sql`SELECT 1`)
    console.log("PostgreSQL connected")
  } catch (error) {
    console.error("PostgreSQL connection error", error)
    process.exit(1)
  }
}

export default connectDB

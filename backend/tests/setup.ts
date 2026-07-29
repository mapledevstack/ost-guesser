import { afterAll, beforeEach } from "vitest"
import { sql } from "drizzle-orm"

import db, { pool } from "../src/db/index.js"

beforeEach(async () => {
  await db.execute(sql`
    TRUNCATE TABLE
      track_artists,
      tracks,
      artists,
      albums,
      users
    RESTART IDENTITY CASCADE
  `)
})

afterAll(async () => {
  await pool.end()
})

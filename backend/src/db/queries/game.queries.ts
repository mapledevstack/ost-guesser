import db from "../index.js"
import { sql } from "drizzle-orm"
import { dailyGames } from "../schema.js"
import { tracks } from "../schema.js"
import { DATABASE_URL } from "../../constants/env.js"

export const getDailyGameByDate = async (date: string) => {
  return db.query.dailyGames.findFirst({ where: { date } })
}

type createDailyGameType = typeof dailyGames.$inferInsert

export const createDailyGame = (data: createDailyGameType) =>
  db.insert(dailyGames).values(data)

export const getRandomTrack = async () => {
  const [track] = await db
    .select({ id: tracks.id })
    .from(tracks)
    .orderBy(sql`random()`)
    .limit(1)

  if (!track) {
    throw new Error("No tracks found")
  }

  return track
}

export const searchEntities = async (query: string) => {
  return db.execute(sql`
    SELECT *
    FROM (
      SELECT
        t.id,
        t.title AS name,
        'track'::text AS type
      FROM tracks t
      WHERE t.title ILIKE ${`%${query}%`}

      UNION ALL

      SELECT
        a.id,
        a.title AS name,
        'album'::text AS type
      FROM albums a
      WHERE a.title ILIKE ${`%${query}%`}

      UNION ALL

      SELECT
        ar.id::text,
        ar.name,
        'artist'::text AS type
      FROM artists ar
      WHERE ar.name ILIKE ${`%${query}%`}

      UNION ALL

      SELECT
        t.id,
        t.character AS name,
        'character'::text AS type
      FROM tracks t
      WHERE t.character IS NOT NULL
        AND t.character ILIKE ${`%${query}%`}
    ) results
    LIMIT 20;
  `)
}

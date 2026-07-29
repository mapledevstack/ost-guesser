import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  uuid,
  jsonb,
  date,
  timestamp,
} from "drizzle-orm/pg-core"

export const artistRoleEnum = pgEnum("artist_role", [
  "composer",
  "arranger",
  "performer",
])

export const albums = pgTable("albums", {
  id: text().primaryKey(), // Stores the Youtube playlist ID
  title: text().notNull(),
  cover: text().notNull(),
})

export const tracks = pgTable("tracks", {
  id: text().primaryKey(), // Stores the YouTube video ID
  albumId: text()
    .notNull()
    .references(() => albums.id),
  title: text().notNull(),
  character: text(),
})

export const artists = pgTable("artists", {
  id: uuid().defaultRandom().primaryKey(),
  name: text().notNull().unique(),
})

export const trackArtists = pgTable(
  "track_artists",
  {
    trackId: text()
      .notNull()
      .references(() => tracks.id),
    artistId: uuid()
      .notNull()
      .references(() => artists.id),
    role: artistRoleEnum().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.trackId, table.artistId, table.role],
    }),
  ],
)

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),

  googleId: text().notNull().unique(),
  email: text().notNull().unique(),

  displayName: text(),
  avatarUrl: text(),

  gameStats: jsonb()
    .notNull()
    .default({
      daily: {
        gamesPlayed: 0,
        currentStreak: 0,
        bestStreak: 0,
        score: 0,
      },
      endless: {
        gamesPlayed: 0,
        totalScore: 0,
        bestScore: 0,
        currentStreak: 0,
        bestStreak: 0,
      },
    }),

  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const dailyGames = pgTable("daily_games", {
  date: date("date").primaryKey(),
  trackId: text()
    .notNull()
    .references(() => tracks.id),
})

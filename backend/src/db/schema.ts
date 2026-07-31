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

const defaultGameStats = {
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
}

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),

  googleId: text().notNull().unique(),
  email: text().notNull().unique(),

  displayName: text(),
  avatarUrl: text(),

  gameStats: jsonb()
    .$type<typeof defaultGameStats>()
    .notNull()
    .default(defaultGameStats),

  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
})

export const guests = pgTable("guests", {
  id: uuid().primaryKey(),

  gameStats: jsonb()
    .$type<typeof defaultGameStats>()
    .notNull()
    .default(defaultGameStats),

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

export const gameModeEnum = pgEnum("game_mode", ["daily", "endless"])

export const gameStatusEnum = pgEnum("game_status", ["playing", "won", "lost"])

type GameGuess = {
  type: "track" | "album" | "artist" | "character"
  name: string
}

export const gameSessions = pgTable("game_sessions", {
  id: uuid().defaultRandom().primaryKey(),

  mode: gameModeEnum().notNull(),

  userId: uuid().references(() => users.id),
  guestId: uuid().references(() => guests.id),

  trackId: text()
    .notNull()
    .references(() => tracks.id),

  dailyGameDate: date().references(() => dailyGames.date),

  guesses: jsonb().$type<GameGuess[]>().notNull().default([]),

  status: gameStatusEnum().notNull().default("playing"),

  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
})

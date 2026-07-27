import { pgEnum, pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core"

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

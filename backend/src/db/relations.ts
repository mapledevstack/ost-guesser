import { relations } from "drizzle-orm/_relations"
import { albums, artists, trackArtists, tracks } from "./schema.js"

export const albumRelations = relations(albums, ({ many }) => ({
  tracks: many(tracks),
}))

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),

  trackArtists: many(trackArtists),
}))

export const artistsRelations = relations(tracks, ({ many }) => ({
  trackArtists: many(trackArtists),
}))

export const trackArtistsRelations = relations(trackArtists, ({ one }) => ({
  track: one(tracks, {
    fields: [trackArtists.trackId],
    references: [tracks.id],
  }),

  artist: one(artists, {
    fields: [trackArtists.artistId],
    references: [artists.id],
  }),
}))

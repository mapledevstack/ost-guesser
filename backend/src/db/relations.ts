import { defineRelations } from "drizzle-orm"
import * as schema from "./schema.js"

const relations = defineRelations(schema, (r) => ({
  albums: {
    tracks: r.many.tracks({
      from: r.albums.id,
      to: r.tracks.albumId,
    }),
  },

  tracks: {
    album: r.one.albums({
      from: r.tracks.albumId,
      to: r.albums.id,
      optional: false,
    }),

    trackArtists: r.many.trackArtists({
      from: r.tracks.id,
      to: r.trackArtists.trackId,
    }),

    artists: r.many.artists({
      from: r.tracks.id.through(r.trackArtists.trackId),
      to: r.artists.id.through(r.trackArtists.artistId),
    }),
  },

  artists: {
    trackArtists: r.many.trackArtists({
      from: r.artists.id,
      to: r.trackArtists.artistId,
    }),

    tracks: r.many.tracks({
      from: r.artists.id.through(r.trackArtists.artistId),
      to: r.tracks.id.through(r.trackArtists.trackId),
    }),
  },

  trackArtists: {
    track: r.one.tracks({
      from: r.trackArtists.trackId,
      to: r.tracks.id,
      optional: false,
    }),

    artist: r.one.artists({
      from: r.trackArtists.artistId,
      to: r.artists.id,
      optional: false,
    }),
  },
}))

export default relations

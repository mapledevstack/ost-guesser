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

    daily_games: r.many.dailyGames({
      from: r.tracks.id,
      to: r.dailyGames.trackId,
    }),

    gameSessions: r.many.gameSessions({
      from: r.tracks.id,
      to: r.gameSessions.trackId,
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

  dailyGames: {
    track: r.one.tracks({
      from: r.dailyGames.trackId,
      to: r.tracks.id,
      optional: false,
    }),

    gameSessions: r.many.gameSessions({
      from: r.dailyGames.date,
      to: r.gameSessions.dailyGameDate,
    }),
  },

  users: {
    gameSessions: r.many.gameSessions({
      from: r.users.id,
      to: r.gameSessions.userId,
    }),
  },

  guests: {
    gameSessions: r.many.gameSessions({
      from: r.guests.id,
      to: r.gameSessions.guestId,
    }),
  },

  gameSessions: {
    user: r.one.users({
      from: r.gameSessions.userId,
      to: r.users.id,
      optional: true,
    }),

    guest: r.one.guests({
      from: r.gameSessions.guestId,
      to: r.guests.id,
      optional: true,
    }),

    track: r.one.tracks({
      from: r.gameSessions.trackId,
      to: r.tracks.id,
      optional: false,
    }),

    dailyGame: r.one.dailyGames({
      from: r.gameSessions.dailyGameDate,
      to: r.dailyGames.date,
      optional: true,
    }),
  },
}))

export default relations

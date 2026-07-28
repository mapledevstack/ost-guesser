import db from "../index.js"

export const getTrack = async (trackId: string) => {
  return db.query.tracks.findFirst({
    where: {
      id: trackId,
    },
    with: {
      album: true,
      trackArtists: {
        with: {
          artist: true,
        },
      },
    },
  })
}

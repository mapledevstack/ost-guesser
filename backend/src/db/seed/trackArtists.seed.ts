import type { ExtractedAlbum } from "../../schema/playlist.schema.js"
import db from "../index.js"
import { trackArtists } from "../schema.js"

const seedTrackArtists = async (
  albums: ExtractedAlbum[],
  artistMap: Map<string, string>,
) => {
  const trackArtistRows: (typeof trackArtists.$inferInsert)[] = []

  for (const album of albums) {
    for (const track of album.tracks) {
      const credits = [
        {
          role: "composer",
          names: track.credits.composers,
        },
        {
          role: "arranger",
          names: track.credits.arrangers,
        },
        {
          role: "performer",
          names: track.credits.performers,
        },
      ] as const

      for (const { role, names } of credits) {
        for (const name of names) {
          const artistId = artistMap.get(name)

          if (!artistId) {
            throw new Error(`Artist "${name}" not found.`)
          }

          trackArtistRows.push({
            trackId: track.youtubeId,
            artistId,
            role,
          })
        }
      }
    }
  }

  await db.insert(trackArtists).values(trackArtistRows).onConflictDoNothing()
}

export default seedTrackArtists

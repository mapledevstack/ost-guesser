import type { ExtractedAlbum } from "../../schema/album.schema.js"
import db from "../index.js"
import { artists } from "../schema.js"

const seedArtists = async (
  albums: ExtractedAlbum[],
): Promise<Map<string, string>> => {
  const artistNames = new Set<string>()

  for (const album of albums) {
    for (const track of album.tracks) {
      track.credits.composers.forEach((artist) => artistNames.add(artist))
      track.credits.arrangers.forEach((artist) => artistNames.add(artist))
      track.credits.performers.forEach((artist) => artistNames.add(artist))
    }
  }

  const artistRows = [...artistNames].map((name) => ({
    name,
  }))

  await db.insert(artists).values(artistRows).onConflictDoNothing()

  const dbArtists = await db.select().from(artists)

  return new Map(dbArtists.map((artist) => [artist.name, artist.id]))
}

export default seedArtists

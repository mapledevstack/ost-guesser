import type { ExtractedAlbum } from "../../schema/album.schema.js"
import db from "../index.js"
import { tracks } from "../schema.js"

const seedTracks = async (extractedAlbums: ExtractedAlbum[]) => {
  const trackRows = extractedAlbums.flatMap((album) =>
    album.tracks.map((track) => ({
      id: track.youtubeId,
      albumId: album.id,
      title: track.title,
    })),
  )

  await db.insert(tracks).values(trackRows).onConflictDoNothing()
}

export default seedTracks

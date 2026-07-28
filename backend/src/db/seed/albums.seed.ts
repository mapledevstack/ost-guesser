import type { ExtractedAlbum } from "../../schema/playlist.schema.js"
import db from "../index.js"
import { albums } from "../schema.js"

const seedAlbums = async (extractedAlbums: ExtractedAlbum[]) => {
  await db
    .insert(albums)
    .values(
      extractedAlbums.map((album) => ({
        id: album.id,
        title: album.title,
        cover: album.cover,
      })),
    )
    .onConflictDoNothing()
}

export default seedAlbums

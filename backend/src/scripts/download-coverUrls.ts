import fs from "node:fs/promises"
import path from "node:path"
import db from "../db/index.js"
import { albums as albumsTable } from "../db/schema.js"
import { getPlaylistDetails } from "../services/youtube.service.js"

const COVERS_DIR = path.resolve("assets/covers")

await fs.mkdir(COVERS_DIR, { recursive: true })

const albumRows = await db.select().from(albumsTable)

for (const album of albumRows) {
  const outputPath = path.join(COVERS_DIR, `${album.id}.jpg`)

  // Don't download again if the script is rerun
  try {
    await fs.access(outputPath)
    console.log(`Already exists: ${album.id}`)
    continue
  } catch {
    // File doesn't exist, continue downloading
  }

  const { thumbnailUrl } = await getPlaylistDetails(album.id)

  const response = await fetch(thumbnailUrl)

  if (!response.ok) {
    console.error(`Failed: ${album.id}`)
    continue
  }

  const buffer = Buffer.from(await response.arrayBuffer())

  await fs.writeFile(outputPath, buffer)

  console.log(`Downloaded: ${album.id}`)
}

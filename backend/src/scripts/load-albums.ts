import fs from "node:fs/promises"
import path from "node:path"
import { ExtractedAlbumSchema } from "../schema/album.schema.js"

export const loadAlbums = async () => {
  const directory = path.join(process.cwd(), "src/data/extracted")

  const files = await fs.readdir(directory)

  const albums = await Promise.all(
    files
      .filter((file) => file.endsWith(".json"))
      .map(async (file) => {
        const filePath = path.join(directory, file)

        const contents = await fs.readFile(filePath, "utf8")

        return ExtractedAlbumSchema.parse(JSON.parse(contents))
      }),
  )

  return albums
}

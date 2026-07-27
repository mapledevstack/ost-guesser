import fs from "fs/promises"
import path from "path"

import albumsJson from "../data/albums.json" with { type: "json" }
import { AlbumsSchema } from "../schema/album.schema.js"
import { generateClips } from "../services/clip.service.js"
import {
  getPlaylistDetails,
  getPlaylistVideoIds,
  getVideosDetails,
} from "../services/youtube.service.js"

const albums = AlbumsSchema.parse(albumsJson)

const outputDir = path.join(process.cwd(), "src/data/extracted")

await fs.mkdir(outputDir, {
  recursive: true,
})

for (const album of albums) {
  const outputPath = path.join(outputDir, `${album.slug}.json`)

  try {
    await fs.access(outputPath)
    console.log(`Skipping "${album.slug}" (already exists)`)
    continue
  } catch {
    // Doesn't exist, extract it.
  }

  console.log(`Extracting "${album.id}"...\n`)

  const playlist = await getPlaylistDetails(album.id)
  const videoIds = await getPlaylistVideoIds(album.id)
  const videos = await getVideosDetails(videoIds)
  const clips = await generateClips(videoIds)

  const tracks = videos.map((video) => ({
    ...video,
    clip: clips.find((clip) => clip.videoId === video.youtubeId) ?? null,
  }))

  const extractedAlbum = {
    ...album,
    id: playlist.id,
    title: playlist.title,
    cover: playlist.thumbnailUrl,
    tracks,
  }

  await fs.writeFile(outputPath, JSON.stringify(extractedAlbum, null, 2))

  console.log(`Saved ${outputPath}`)
}

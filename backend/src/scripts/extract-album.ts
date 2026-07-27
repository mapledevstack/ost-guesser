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

const albumId = process.argv[2]

if (!albumId) {
  console.error("No album ID provided")
  process.exit(1)
}

const albums = AlbumsSchema.parse(albumsJson)

const album = albums.find((album) => album.id === albumId)

if (!album) {
  console.error(`Album ${albumId} not found`)
  process.exit(1)
}

const playlist = await getPlaylistDetails(album.youtubePlaylistId)

const videoIds = await getPlaylistVideoIds(album.youtubePlaylistId)

const videos = await getVideosDetails(videoIds)

const clips = await generateClips(videoIds)

const tracks = videos.map((video) => ({
  ...video,
  clip: clips.find((clip) => clip.videoId === video.youtubeId) ?? null,
}))

const extractedAlbum = {
  ...album,
  playlist,
  tracks,
}

const outputDir = path.join(process.cwd(), "src/data/extracted")

await fs.mkdir(outputDir, {
  recursive: true,
})

const outputPath = path.join(outputDir, `${album.id}.json`)

// upsert: create or replace existing snapshot
await fs.writeFile(outputPath, JSON.stringify(extractedAlbum, null, 2))

console.log(`Extracted album saved: ${outputPath}`)

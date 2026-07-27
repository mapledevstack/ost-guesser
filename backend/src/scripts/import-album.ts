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
const videosIds = await getPlaylistVideoIds(album.youtubePlaylistId)

const playlist = await getPlaylistDetails(album.youtubePlaylistId)
const videos = await getVideosDetails(videosIds)

await generateClips(videosIds)

// console.log(JSON.stringify(playlist, null, 2))
// console.log(JSON.stringify(videos, null, 2))

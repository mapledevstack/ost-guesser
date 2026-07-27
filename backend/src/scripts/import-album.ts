import albumsJson from "../data/albums.json" with { type: "json" }
import { AlbumsSchema } from "../schema/album.schema.js"
import {
  getPlaylistDetails,
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
const videos = await getVideosDetails(album.youtubePlaylistId)

console.log(JSON.stringify(playlist, null, 2))
console.log(JSON.stringify(videos, null, 2))

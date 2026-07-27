import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { YOUTUBE_API_KEY } from "../constants/env.js"
import { INTERNAL_SERVER_ERROR } from "../constants/http.js"
import type { YoutubeSongs } from "../schema/songs.schema.js"
import {
  PlaylistDetailSchema,
  YouTubePlaylistDetailsResponseSchema,
  YoutubePlaylistItemsResponseSchema,
  YoutubeVideosResponseSchema,
} from "../schema/youtube.schema.js"
import appAssert from "../utils/appAssert.js"
import { cleanAlbumTitle, parseYoutubeDescription } from "../utils/parser.js"

const API_BASE_URL = "https://www.googleapis.com/youtube/v3"

export const getPlaylistDetails = async (playlistId: string) => {
  const url = new URL(`${API_BASE_URL}/playlists`)

  url.searchParams.set("part", "snippet")
  url.searchParams.set("id", playlistId)
  url.searchParams.set("key", YOUTUBE_API_KEY)

  const response = await fetch(url)

  appAssert(
    response.ok,
    INTERNAL_SERVER_ERROR,
    "Failed to fetch playlist details",
    ERROR_CODES.YOUTUBE_API_ERROR,
  )

  const data = YouTubePlaylistDetailsResponseSchema.parse(await response.json())

  appAssert(
    data.items.length > 0,
    INTERNAL_SERVER_ERROR,
    "Playlist not found",
    ERROR_CODES.PLAYLIST_NOT_FOUND,
  )

  const playlist = data.items[0]!

  return PlaylistDetailSchema.parse({
    id: playlist.id,
    title: cleanAlbumTitle(playlist.snippet.title),
    thumbnailUrl:
      playlist.snippet.thumbnails.maxres?.url ??
      playlist.snippet.thumbnails.high?.url ??
      playlist.snippet.thumbnails.default?.url,
  })
}

export const getPlaylistVideoIds = async (playlistId: string) => {
  const url = new URL(`${API_BASE_URL}/playlistItems`)

  url.searchParams.set("part", "contentDetails")
  url.searchParams.set("playlistId", playlistId)
  url.searchParams.set("maxResults", "50")
  url.searchParams.set("key", YOUTUBE_API_KEY)

  const response = await fetch(url)

  appAssert(
    response.ok,
    INTERNAL_SERVER_ERROR,
    "Failed to fetch playlist",
    ERROR_CODES.YOUTUBE_API_ERROR,
  )

  const data = YoutubePlaylistItemsResponseSchema.parse(await response.json())

  const videoIds = data.items.map((item) => item.contentDetails.videoId)

  appAssert(
    videoIds.length > 0,
    INTERNAL_SERVER_ERROR,
    "No videos found in playlist",
    ERROR_CODES.EMPTY_PLAYLIST,
  )

  return videoIds
}

export const getVideosDetails = async (
  videosIds: string[],
): Promise<YoutubeSongs> => {
  const url = new URL(`${API_BASE_URL}/videos`)

  url.searchParams.set("part", "snippet")
  url.searchParams.set("id", videosIds.join(","))
  url.searchParams.set("key", YOUTUBE_API_KEY)

  const response = await fetch(url)

  appAssert(
    response.ok,
    INTERNAL_SERVER_ERROR,
    "Failed to fetch videos",
    ERROR_CODES.YOUTUBE_API_ERROR,
  )

  const data = YoutubeVideosResponseSchema.parse(await response.json())

  return data.items.map((item) => ({
    youtubeId: item.id,
    title: item.snippet.title,
    credits: parseYoutubeDescription(item.snippet.description),
  }))
}

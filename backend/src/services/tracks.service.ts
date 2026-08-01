import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { NOT_FOUND } from "../constants/http.js"
import { getTrack } from "../db/queries/tracks.queries.js"
import appAssert from "../utils/appAssert.js"

export const getTrackService = async (trackId: string) => {
  const track = await getTrack(trackId)

  appAssert(track, NOT_FOUND, "Track not found", ERROR_CODES.SONG_NOT_FOUND)

  return {
    id: track.id,
    title: track.title,
    albumId: track.albumId,
    character: track.character,
    artists: track.trackArtists.map(({ artist, role }) => ({
      id: artist.id,
      name: artist.name,
      role,
    })),
  }
}

import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { BASE_SCORES, MULTIPLIERS } from "../constants/game.js"
import { BAD_REQUEST } from "../constants/http.js"
import type { getSessionById } from "../db/queries/session.queries.js"
import type { getTrack } from "../db/queries/tracks.queries.js"
import type { PlayerIdentityType } from "../schema/auth.schema.js"
import type { GuessResult, GuessType } from "../schema/game.schema.js"
import appAssert from "./appAssert.js"

type TrackWithRelations = NonNullable<Awaited<ReturnType<typeof getTrack>>>

export const isCorrectGuess = (guess: GuessType, track: TrackWithRelations) => {
  switch (guess.type) {
    case "track":
      return guess.name === track.title

    case "album":
      return guess.name === track.album.title

    case "character":
      return guess.name === track.character

    case "artist":
      return track.trackArtists.some(({ artist }) => artist.name === guess.name)

    default:
      return false
  }
}

export const calculateScore = (
  guessCount: number,
  guessType: GuessType["type"],
) => Math.round(BASE_SCORES[guessType] * MULTIPLIERS[guessCount - 1]!)

type AssertSessionOwnershipType = {
  session: Awaited<ReturnType<typeof getSessionById>>
  playerIdentity: PlayerIdentityType
}

export const assertSessionOwnership = (
  session: AssertSessionOwnershipType["session"],
  playerIdentity: AssertSessionOwnershipType["playerIdentity"],
) => {
  if (playerIdentity.type === "guest") {
    appAssert(
      session?.guestId === playerIdentity.guestId,
      BAD_REQUEST,
      ERROR_CODES.GUEST_MISMATCH,
    )
  }

  if (playerIdentity.type === "user") {
    appAssert(
      session?.userId === playerIdentity.userId,
      BAD_REQUEST,
      ERROR_CODES.USER_MISMATCH,
    )
  }
}

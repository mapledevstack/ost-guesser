import { BASE_SCORES, MULTIPLIERS } from "../constants/game.js"
import type { getTrack } from "../db/queries/tracks.queries.js"
import type { GuessResult, GuessType } from "../schema/game.schema.js"

type TrackWithRelations = NonNullable<Awaited<ReturnType<typeof getTrack>>>

export const isCorrectGuess = (guess: GuessType, track: TrackWithRelations) => {
  switch (guess.type) {
    case "track":
      return guess.id === track.id

    case "album":
      return guess.id === track.albumId

    case "character":
      return guess.id === track.character

    case "artist":
      return track.trackArtists.some(({ artist }) => artist.id === guess.id)

    default:
      return false
  }
}

export const formatGuessResult = (result: GuessResult) => ({
  correct: result.correct,
  status: result.status,
  guessCount: result.guessCount,
  answer:
    result.status !== "playing"
      ? {
          id: result.track.id,
          title: result.track.title,
        }
      : undefined,
  guessMatch: result.guessMatch,
})

export const calculateScore = (
  guessCount: number,
  guessMatch: GuessType["type"],
) => Math.round(BASE_SCORES[guessMatch] * MULTIPLIERS[guessCount - 1]!)

import { BASE_SCORES, MULTIPLIERS } from "../constants/game.js"
import type { getTrack } from "../db/queries/tracks.queries.js"
import type { GuessResult, GuessType } from "../schema/game.schema.js"

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

export const formatGuessResult = (result: GuessResult) => ({
  correct: result.correct,
  status: result.status,
  guesses: result.guesses,
  answer:
    result.status !== "playing"
      ? {
          id: result.track.id,
          title: result.track.title,
        }
      : undefined,
})

export const calculateScore = (
  guessCount: number,
  guessType: GuessType["type"],
) => Math.round(BASE_SCORES[guessType] * MULTIPLIERS[guessCount - 1]!)

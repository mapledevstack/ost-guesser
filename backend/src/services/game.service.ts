import app from "../app.js"
import { ERROR_CODES } from "../constants/appErrorCodes.js"
import { SUPABASE_URL } from "../constants/env.js"
import { MAX_GUESSES } from "../constants/game.js"
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js"
import {
  createDailyGame,
  getAlbums,
  getDailyGameByDate,
  getRandomTrack,
  searchEntities,
} from "../db/queries/game.queries.js"
import {
  createGameSession,
  getGameSession,
  getSessionById,
  updateDailyStats,
  updateEndlessStats,
  updateGameSession,
} from "../db/queries/session.queries.js"
import { getTrack } from "../db/queries/tracks.queries.js"
import type { GameModeType, PlayerIdentityType } from "../schema/auth.schema.js"
import type { GuessGameType } from "../schema/game.schema.js"
import appAssert from "../utils/appAssert.js"
import { formatGuessResult, isCorrectGuess } from "../utils/game.js"
import { getCurrentDate } from "../utils/time.js"

export const searchService = async (query: string) => {
  const { rows } = await searchEntities(query)

  return rows
}

export const getAlbumsService = async () => {
  const albums = await getAlbums()

  return {
    covers: albums.map((album) => album.id),
  }
}

type StartGameServiceType = {
  mode: GameModeType
  playerIdentity: PlayerIdentityType
}

export const startGameService = async ({
  mode,
  playerIdentity,
}: StartGameServiceType) => {
  const userId = playerIdentity.type === "user" ? playerIdentity.userId : null

  const guestId =
    playerIdentity.type === "guest" ? playerIdentity.guestId : null

  const session = await getGameSession({
    mode,
    userId,
    guestId,
  })

  if (session) {
    if (session.status === "playing") {
      return {
        sessionId: session.id,
        clipUrl: `${SUPABASE_URL}/${session.trackId}.mp3`,
        guesses: session.guesses,
        status: session.status,
      }
    }

    const track = await getTrack(session.trackId)

    appAssert(track, NOT_FOUND, ERROR_CODES.TRACK_NOT_FOUND)

    return {
      sessionId: session.id,
      clipUrl: `${SUPABASE_URL}/${session.trackId}.mp3`,
      guesses: session.guesses,
      status: session.status,
      answer: {
        id: session.trackId,
        title: track.title,
        albumId: track.album.id,
      },
    }
  }

  let trackId: string
  let dailyGameDate: string | null = null

  if (mode === "daily") {
    let dailyGame = await getDailyGameByDate(getCurrentDate())

    if (!dailyGame) {
      const track = await getRandomTrack()

      await createDailyGame({
        date: getCurrentDate(),
        trackId: track.id,
      })

      dailyGame = {
        date: getCurrentDate(),
        trackId: track.id,
      }
    }

    trackId = dailyGame.trackId
    dailyGameDate = dailyGame.date
  } else {
    const track = await getRandomTrack()
    trackId = track.id
  }

  const newSession = await createGameSession({
    mode,
    userId,
    guestId,
    trackId,
    dailyGameDate,
  })

  return {
    sessionId: newSession.id,
    clipUrl: `${SUPABASE_URL}/${trackId}.mp3`,
    guesses: newSession.guesses,
    status: newSession.status,
  }
}

export const processGuess = async ({
  sessionId,
  guesses,
  playerIdentity,
}: GuessGameType & {
  playerIdentity: PlayerIdentityType
}) => {
  const session = await getSessionById(sessionId)

  appAssert(session, NOT_FOUND, ERROR_CODES.SESSION_NOT_FOUND)

  if (playerIdentity.type === "guest") {
    appAssert(
      session.guestId === playerIdentity.guestId,
      BAD_REQUEST,
      ERROR_CODES.GUEST_MISMATCH,
    )
  }

  if (playerIdentity.type === "user") {
    appAssert(
      session.userId === playerIdentity.userId,
      BAD_REQUEST,
      ERROR_CODES.USER_MISMATCH,
    )
  }

  appAssert(
    session.status === "playing",
    BAD_REQUEST,
    ERROR_CODES.GAME_ALREADY_FINISHED,
  )

  const track = await getTrack(session.trackId)

  appAssert(track, NOT_FOUND, ERROR_CODES.TRACK_NOT_FOUND)

  const guess = guesses.at(-1)

  appAssert(guess, BAD_REQUEST, ERROR_CODES.INVALID_GUESS)

  const correct = isCorrectGuess(guess, track)

  const guessCount = guesses.length

  const status = correct
    ? "won"
    : guessCount >= MAX_GUESSES
      ? "lost"
      : "playing"

  const updatedSession = await updateGameSession(session.id, {
    guesses,
    status,
  })

  const result = {
    correct,
    status: updatedSession.status,
    guesses: updatedSession.guesses,
    track,
  }

  if (result.status !== "playing") {
    if (session.mode === "daily") {
      await updateDailyStats({ playerIdentity, result })
    } else {
      await updateEndlessStats({ playerIdentity, result })
    }
  }

  return formatGuessResult(result)
}

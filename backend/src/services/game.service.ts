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
import {
  getGuestById,
  getUserById,
  updateGuestById,
  updateUserById,
} from "../db/queries/user.queries.js"
import type { gameSessions } from "../db/schema.js"
import type { GameModeType, PlayerIdentityType } from "../schema/auth.schema.js"
import type { GuessGameType } from "../schema/game.schema.js"
import appAssert from "../utils/appAssert.js"
import { getPlayerIds } from "../utils/auth.js"
import { assertSessionOwnership, isCorrectGuess } from "../utils/game.js"
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

type GameSession = typeof gameSessions.$inferSelect

const formatGameSession = async (session: GameSession) => {
  const result = {
    sessionId: session.id,
    clipUrl: `${SUPABASE_URL}/${session.trackId}.mp3`,
    guesses: session.guesses,
    status: session.status,
  }

  if (session.status === "playing") {
    return result
  }

  const track = await getTrack(session.trackId)

  appAssert(track, NOT_FOUND, ERROR_CODES.TRACK_NOT_FOUND)

  return {
    ...result,
    answer: {
      id: session.trackId,
      title: track.title,
      albumId: track.album.id,
    },
  }
}

const getDailyGame = async () => {
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

  return {
    trackId: dailyGame.trackId,
    dailyGameDate: dailyGame.date,
  }
}

const getEndlessGame = async () => {
  const track = await getRandomTrack()

  return {
    trackId: track.id,
    dailyGameDate: null,
  }
}

type StartGameServiceType = {
  mode: GameModeType
  playerIdentity: PlayerIdentityType
}

export const getGameService = async ({
  mode,
  playerIdentity,
}: StartGameServiceType) => {
  const { userId, guestId } = getPlayerIds(playerIdentity)

  const session = await getGameSession({ mode, userId, guestId })

  if (session) {
    return formatGameSession(session)
  }

  const { trackId, dailyGameDate } =
    mode === "daily" ? await getDailyGame() : await getEndlessGame()

  const newSession = await createGameSession({
    mode,
    userId,
    guestId,
    trackId,
    dailyGameDate,
  })

  return formatGameSession(newSession)
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

  assertSessionOwnership(session, playerIdentity)

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

  const status = correct
    ? "won"
    : guesses.length >= MAX_GUESSES
      ? "lost"
      : "playing"

  const updatedSession = await updateGameSession(session.id, {
    guesses,
    status,
  })

  if (status !== "playing") {
    await updateGameStats({
      playerIdentity,
      mode: session.mode,
      guessCount: guesses.length,
      guessType: guess.type,
      status,
    })
  }

  return formatGameSession(updatedSession)
}

export const updateGameStats = async ({
  playerIdentity,
  mode,
  guessCount,
  guessType,
  status,
}: {
  playerIdentity: PlayerIdentityType
  mode: GameModeType
  guessCount: number
  guessType: GuessGameType["guesses"][number]["type"]
  status: "won" | "lost" | "playing"
}) => {
  if (status === "playing") {
    return
  }

  const player =
    playerIdentity.type === "user"
      ? await getUserById(playerIdentity.userId)
      : await getGuestById(playerIdentity.guestId)

  appAssert(player, NOT_FOUND, ERROR_CODES.PLAYER_NOT_FOUND)

  const updatedStats =
    mode === "daily"
      ? updateDailyStats(player.gameStats["daily"], {
          guessCount,
          guessType,
          status,
        })
      : updateEndlessStats(player.gameStats["endless"], {
          guessCount,
          guessType,
          status,
        })

  const updatedGameStats = {
    ...player.gameStats,
    [mode]: updatedStats,
  }

  if (playerIdentity.type === "user") {
    await updateUserById(playerIdentity.userId, {
      gameStats: updatedGameStats,
    })
  } else {
    await updateGuestById(playerIdentity.guestId, {
      gameStats: updatedGameStats,
    })
  }

  return updatedGameStats
}

export const nextEndlessGameService = async ({
  playerIdentity,
}: {
  playerIdentity: PlayerIdentityType
}) => {
  const { userId, guestId } = getPlayerIds(playerIdentity)

  const { trackId, dailyGameDate } = await getEndlessGame()

  const session = await createGameSession({
    mode: "endless",
    userId,
    guestId,
    trackId,
    dailyGameDate,
  })

  return formatGameSession(session)
}

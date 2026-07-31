import { ERROR_CODES } from "../../constants/appErrorCodes.js"
import { NOT_FOUND } from "../../constants/http.js"
import type {
  GameModeType,
  PlayerIdentityType,
} from "../../schema/auth.schema.js"
import type { GuessResult } from "../../schema/game.schema.js"
import appAssert from "../../utils/appAssert.js"
import { calculateScore } from "../../utils/game.js"
import { getCurrentDate } from "../../utils/time.js"
import db from "../index.js"
import { gameSessions } from "../schema.js"
import { eq } from "drizzle-orm"

type GameSessionType = typeof gameSessions.$inferInsert

export const createGameSession = async (values: GameSessionType) => {
  const [session] = await db.insert(gameSessions).values(values).returning()

  if (!session) {
    throw new Error("Failed to create game session")
  }

  return session
}

type GetGameSessionType = {
  mode: GameModeType
  userId: string | null
  guestId: string | null
}

export const getGameSession = async ({
  mode,
  userId,
  guestId,
}: GetGameSessionType) => {
  if (mode === "daily") {
    if (userId) {
      return db.query.gameSessions.findFirst({
        where: {
          mode,
          userId,
          dailyGameDate: getCurrentDate(),
        },
      })
    }

    if (guestId) {
      return db.query.gameSessions.findFirst({
        where: {
          mode,
          guestId,
          dailyGameDate: getCurrentDate(),
        },
      })
    }
  } else {
    if (userId) {
      return db.query.gameSessions.findFirst({
        where: {
          mode,
          userId,
          status: "playing",
        },
      })
    }

    if (guestId) {
      return db.query.gameSessions.findFirst({
        where: {
          mode,
          guestId,
          status: "playing",
        },
      })
    }
  }

  throw new Error("Expected either userId or guestId")
}

export const getSessionById = async (id: string) => {
  return db.query.gameSessions.findFirst({
    where: {
      id,
    },
  })
}

type UpdateGameSessionType = Partial<
  Pick<typeof gameSessions.$inferInsert, "guesses" | "status">
>

export const updateGameSession = async (
  id: string,
  values: UpdateGameSessionType,
) => {
  const [session] = await db
    .update(gameSessions)
    .set(values)
    .where(eq(gameSessions.id, id))
    .returning()

  if (!session) {
    throw new Error("Failed to update game session")
  }

  return session
}

const getPlayerGameStats = async (playerIdentity: PlayerIdentityType) => {
  if (playerIdentity.type === "user") {
    const user = await db.query.users.findFirst({
      where: {
        id: playerIdentity.userId,
      },
    })

    return user?.gameStats
  }

  const guest = await db.query.guests.findFirst({
    where: {
      id: playerIdentity.guestId,
    },
  })

  return guest?.gameStats
}

type UpdateStatsType = {
  playerIdentity: PlayerIdentityType
  result: GuessResult
}

export const updateDailyStats = async ({
  playerIdentity,
  result,
}: UpdateStatsType) => {
  const gameStats = await getPlayerGameStats(playerIdentity)

  appAssert(gameStats, NOT_FOUND, ERROR_CODES.PLAYER_NOT_FOUND)

  if (result.status === "won") {
    gameStats.daily.gamesPlayed++
    gameStats.daily.currentStreak++
    gameStats.daily.bestStreak = Math.max(
      gameStats.daily.bestStreak,
      gameStats.daily.currentStreak,
    )

    const latestGuess = result.guesses.at(-1)

    if (latestGuess) {
      gameStats.daily.score += calculateScore(
        result.guesses.length,
        latestGuess.type,
      )
    }
  }

  if (result.status === "lost") {
    gameStats.daily.gamesPlayed++
    gameStats.daily.currentStreak = 0
  }
}

export const updateEndlessStats = async ({
  playerIdentity,
  result,
}: UpdateStatsType) => {
  const gameStats = await getPlayerGameStats(playerIdentity)

  appAssert(gameStats, NOT_FOUND, ERROR_CODES.PLAYER_NOT_FOUND)

  if (result.status === "won") {
    gameStats.endless.gamesPlayed++

    const latestGuess = result.guesses.at(-1)

    if (latestGuess) {
      const score = calculateScore(result.guesses.length, latestGuess.type)

      gameStats.endless.totalScore += score
      gameStats.endless.bestScore = Math.max(gameStats.endless.bestScore, score)
    }

    gameStats.endless.currentStreak++

    gameStats.endless.bestStreak = Math.max(
      gameStats.endless.bestStreak,
      gameStats.endless.currentStreak,
    )
  }

  if (result.status === "lost") {
    gameStats.endless.gamesPlayed++
    gameStats.endless.currentStreak = 0
  }
}

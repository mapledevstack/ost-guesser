import type {
  GameModeType,
  PlayerIdentityType,
} from "../../schema/auth.schema.js"
import type { GuessGameType, GuessResult } from "../../schema/game.schema.js"
import { calculateScore } from "../../utils/game.js"
import { getCurrentDate } from "../../utils/time.js"
import db from "../index.js"
import { gameSessions, users } from "../schema.js"
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
        },
        orderBy: (gameSessions, { desc }) => [desc(gameSessions.createdAt)],
      })
    }

    if (guestId) {
      return db.query.gameSessions.findFirst({
        where: {
          mode,
          guestId,
        },
        orderBy: (gameSessions, { desc }) => [desc(gameSessions.createdAt)],
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

type UpdateStatsType = {
  playerIdentity: PlayerIdentityType
  result: GuessResult
}

type UpdateStatsInput = {
  guessCount: number
  guessType: GuessGameType["guesses"][number]["type"]
  status: "won" | "lost"
}

type DailyGameStats = (typeof users.$inferSelect)["gameStats"]["daily"]
type EndlessGameStats = (typeof users.$inferSelect)["gameStats"]["endless"]

export const updateDailyStats = (
  stats: DailyGameStats,
  { guessCount, guessType, status }: UpdateStatsInput,
): DailyGameStats => {
  const gamesPlayed = stats.gamesPlayed + 1

  if (status === "lost") {
    return {
      ...stats,
      gamesPlayed,
      currentStreak: 0,
    }
  }

  const currentStreak = stats.currentStreak + 1
  const score = calculateScore(guessCount, guessType)

  return {
    ...stats,
    gamesPlayed,
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak),
    score: stats.score + score,
  }
}

export const updateEndlessStats = (
  stats: EndlessGameStats,
  { guessCount, guessType, status }: UpdateStatsInput,
): EndlessGameStats => {
  const gamesPlayed = stats.gamesPlayed + 1

  if (status === "lost") {
    return {
      ...stats,
      gamesPlayed,
      currentStreak: 0,
    }
  }

  const currentStreak = stats.currentStreak + 1
  const score = calculateScore(guessCount, guessType)

  return {
    ...stats,
    gamesPlayed,
    currentStreak,
    bestStreak: Math.max(stats.bestStreak, currentStreak),
    totalScore: stats.totalScore + score,
    bestScore: Math.max(stats.bestScore, score),
  }
}

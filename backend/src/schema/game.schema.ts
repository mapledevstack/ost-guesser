import z from "zod"

export const searchQuerySchema = z.object({
  q: z.string(),
})

export const AuthSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    userId: z.string(),
    guestId: z.undefined().optional(),
  }),
  z.object({
    type: z.literal("guest"),
    guestId: z.string(),
    userId: z.undefined().optional(),
  }),
])

export const GuessTypeSchema = z.enum(["track", "album", "character", "artist"])

export const GuessSchema = z.object({
  id: z.string(),
  type: GuessTypeSchema,
})

export const GuessGameRequestSchema = z.object({
  sessionId: z.string(),
  guess: GuessSchema,
})

export const DailyStatsSchema = z.object({
  gamesPlayed: z.number().default(0),
  currentStreak: z.number().default(0),
  bestStreak: z.number().default(0),
  score: z.number().default(0),
})

export const EndlessStatsSchema = z.object({
  gamesPlayed: z.number().default(0),
  totalScore: z.number().default(0),
  bestScore: z.number().default(0),
  currentStreak: z.number().default(0),
  bestStreak: z.number().default(0),
})

export const GameStatsSchema = z.object({
  daily: DailyStatsSchema,
  endless: EndlessStatsSchema,
})

export type GuessResult = {
  correct: boolean
  status: "playing" | "won" | "lost"
  guessCount: number
  track: {
    id: string
    character: string | null
    title: string
    albumId: string
    album: {
      id: string
      title: string
      cover: string
    }
    trackArtists: {
      trackId: string
      artistId: string
      role: "composer" | "arranger" | "performer"
      artist: {
        id: string
        name: string
      }
    }[]
  }
  guessMatch: GuessType["type"]
}

export type CompleteGameType = z.infer<typeof GuessGameRequestSchema>
export type AuthType = z.infer<typeof AuthSchema>
export type DailyStatsType = z.infer<typeof DailyStatsSchema>
export type EndlessStatsType = z.infer<typeof EndlessStatsSchema>
export type GameStatsType = z.infer<typeof GameStatsSchema>
export type GuessType = z.infer<typeof GuessSchema>
export type GuessGameType = z.infer<typeof GuessGameRequestSchema>

import { z } from "zod"

export const MeSchema = z.union([
  z.object({
    type: z.literal("user"),
    userId: z.uuid(),
  }),
  z.object({
    type: z.literal("guest"),
    guestId: z.uuid(),
  }),
])

export const AuthUserSchema = z.object({
  id: z.string(),
  displayName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  email: z.string().email(),
  gameStats: z.object({
    daily: z.object({
      gamesPlayed: z.number(),
      currentStreak: z.number(),
      bestStreak: z.number(),
      score: z.number(),
    }),
    endless: z.object({
      gamesPlayed: z.number(),
      totalScore: z.number(),
      bestScore: z.number(),
      currentStreak: z.number(),
      bestStreak: z.number(),
    }),
  }),
})

export type Me = z.infer<typeof MeSchema>
export type AuthUser = z.infer<typeof AuthUserSchema>

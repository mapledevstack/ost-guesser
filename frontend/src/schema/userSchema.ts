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

export const UserSchema = z.object({
  type: z.enum(["user", "guest"]),
  id: z.string(),
  displayName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  email: z.email().nullable(),
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

export const UpdateProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(32).optional(),
  avatarUrl: z.string().optional(),
})

export type Me = z.infer<typeof MeSchema>
export type User = z.infer<typeof UserSchema>
export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>

import { z } from "zod"

export const GameModeSchema = z.enum(["daily", "endless"])

export const PlayerIdentitySchema = z.union([
  z.object({
    type: z.literal("user"),
    userId: z.uuid(),
  }),
  z.object({
    type: z.literal("guest"),
    guestId: z.uuid(),
  }),
])

export type GameModeType = z.infer<typeof GameModeSchema>
export type PlayerIdentityType = z.infer<typeof PlayerIdentitySchema>

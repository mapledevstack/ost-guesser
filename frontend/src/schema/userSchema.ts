import { z } from "zod"

export const UserSchema = z.union([
  z.object({
    type: z.literal("user"),
    userId: z.uuid(),
  }),
  z.object({
    type: z.literal("guest"),
    guestId: z.uuid(),
  }),
])

export type User = z.infer<typeof UserSchema>

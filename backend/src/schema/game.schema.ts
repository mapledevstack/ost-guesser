import z from "zod"

export const searchQuerySchema = z.object({
  q: z.string(),
})

export const CompleteDailyGameSchema = z.object({
  guesses: z.array(z.string()),
  auth: z.object({
    type: z.enum(["user", "guest"]),
    userId: z.string().optional(),
    guestId: z.string().optional(),
  }),
})

export type CompleteDailyGameType = z.infer<typeof CompleteDailyGameSchema>

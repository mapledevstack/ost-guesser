import z from "zod"

export const SessionSchema = z.object({
  clipUrl: z.url(),
  sessionId: z.uuid(),
})

export type Session = z.infer<typeof SessionSchema>

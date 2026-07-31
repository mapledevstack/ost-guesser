import z from "zod"

export const SessionSchema = z.object({
  clipUrl: z.url(),
  sessionId: z.uuid(),
})

const SearchEntitySchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.literal("track"),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.literal("album"),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.literal("artist"),
  }),
  z.object({
    id: z.string(),
    name: z.string(),
    type: z.literal("character"),
  }),
])

export type Session = z.infer<typeof SessionSchema>
export const SearchEntitiesSchema = z.array(SearchEntitySchema)
export type SearchEntity = z.infer<typeof SearchEntitySchema>

import z from "zod"

export const SessionSchema = z.object({
  clipUrl: z.url(),
  sessionId: z.uuid(),
})

const SearchEntitySchema = z.object({
  name: z.string(),
  type: z.enum(["track", "album", "artist", "character"]),
})
export type Session = z.infer<typeof SessionSchema>
export const SearchEntitiesSchema = z.array(SearchEntitySchema)
export type SearchEntity = z.infer<typeof SearchEntitySchema>

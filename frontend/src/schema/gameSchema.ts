import { SUPABASE_URL } from "@/constants/env"
import z from "zod"

export const GuessSchema = z.object({
  type: z.enum(["track", "album", "artist", "character"]),
  name: z.string(),
})

export const GuessesSchema = z.array(GuessSchema)

export const SessionSchema = z.object({
  clipUrl: z.url(),
  sessionId: z.uuid(),
  guesses: GuessesSchema,
  status: z.enum(["playing", "won", "lost"]),
  answer: z
    .object({
      id: z.string(),
      title: z.string(),
      albumId: z.string(),
    })
    .optional(),
})

export const GuessResultSchema = z.object({
  sessionId: z.uuid(),
  status: z.enum(["playing", "won", "lost"]),
  guesses: z.array(GuessSchema),
  clipUrl: z.url(),
})

export const SearchEntitySchema = z.object({
  type: z.enum(["track", "album", "artist", "character"]),
  name: z.string(),
})

export const PostGuessRequestSchema = z.object({
  sessionId: z.string(),
  guesses: GuessesSchema,
})

export const AlbumsCoversSchema = z.object({
  covers: z.array(
    z.string().transform((id) => `${SUPABASE_URL}/covers/${id}.webp`)
  ),
})

export type Session = z.infer<typeof SessionSchema>
export const SearchEntitiesSchema = z.array(SearchEntitySchema)
export type SearchEntity = z.infer<typeof SearchEntitySchema>
export type SearchEntities = z.infer<typeof SearchEntitiesSchema>
export type Guess = z.infer<typeof GuessSchema>
export type Guesses = z.infer<typeof GuessesSchema>
export type GuessResult = z.infer<typeof GuessResultSchema>
export type PostGuessRequest = z.infer<typeof PostGuessRequestSchema>

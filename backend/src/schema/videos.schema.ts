import { z } from "zod"

export const YoutubeSongSchema = z.object({
  youtubeId: z.string(),
  title: z.string(),
  credits: z.object({
    composers: z.array(z.string()),
    arrangers: z.array(z.string()),
  }),
})

export const YoutubeSongsSchema = z.array(YoutubeSongSchema)

export type YoutubeSong = z.infer<typeof YoutubeSongSchema>
export type YoutubeSongs = z.infer<typeof YoutubeSongsSchema>

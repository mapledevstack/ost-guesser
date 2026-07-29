import z from "zod"

export const getTrackParamsSchema = z.object({ trackId: z.string() })

export const TrackSchema = z.object({
  id: z.string(),
  title: z.string(),
  albumId: z.string(),
  cover: z.string().url(),
  character: z.string().nullable(),
  artists: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      role: z.enum(["composer", "arranger", "performer"]),
    }),
  ),
})

export type Track = z.infer<typeof TrackSchema>

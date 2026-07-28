import z from "zod"

export const getTrackParamsSchema = z.object({ trackId: z.string() })

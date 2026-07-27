import z from "zod"

export const AlbumSchema = z.object({
  id: z.string(),
  youtubePlaylistId: z.string(),
})

export const AlbumsSchema = z.array(AlbumSchema)

export type Album = z.infer<typeof AlbumSchema>
export type Albums = z.infer<typeof AlbumsSchema>

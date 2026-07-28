import z from "zod"

export const AlbumSchema = z.object({
  id: z.string(),
  slug: z.string(),
})

export const AlbumsSchema = z.array(AlbumSchema)

export type Album = z.infer<typeof AlbumSchema>
export type Albums = z.infer<typeof AlbumsSchema>

const PlaylistSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string().url(),
})

const CreditsSchema = z.object({
  composers: z.array(z.string()),
  arrangers: z.array(z.string()),
  performers: z.array(z.string()),
})

const ClipSchema = z.object({
  videoId: z.string(),
  file: z.string(),
})

const TrackSchema = z.object({
  youtubeId: z.string(),
  title: z.string(),
  credits: CreditsSchema,
  clip: ClipSchema,
  character: z.string().nullable(),
})

export const ExtractedAlbumSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  cover: z.url(),
  tracks: z.array(TrackSchema),
})

export type ExtractedAlbum = z.infer<typeof ExtractedAlbumSchema>
export type ExtractedTrack = z.infer<typeof TrackSchema>
export type ExtractedClip = z.infer<typeof ClipSchema>

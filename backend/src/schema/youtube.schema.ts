import { z } from "zod"

export const YouTubePlaylistDetailsResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      snippet: z.object({
        title: z.string(),
        thumbnails: z.object({
          default: z
            .object({
              url: z.string(),
            })
            .optional(),

          high: z
            .object({
              url: z.string(),
            })
            .optional(),

          maxres: z
            .object({
              url: z.string(),
            })
            .optional(),
        }),
      }),
    }),
  ),
})

export const PlaylistDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnailUrl: z.string(),
})

export const YoutubePlaylistItemsResponseSchema = z.object({
  items: z.array(
    z.object({
      contentDetails: z.object({
        videoId: z.string(),
      }),
    }),
  ),
})

export const YoutubeVideoSchema = z.object({
  id: z.string(),
  snippet: z.object({
    title: z.string(),
    description: z.string(),
  }),
})

export const YoutubeVideosResponseSchema = z.object({
  items: z.array(YoutubeVideoSchema),
})

import { SUPABASE_URL } from "@/constants/env"

export const getAlbumCoverUrl = (albumId: string) =>
  `${SUPABASE_URL}/covers/${albumId}.webp`

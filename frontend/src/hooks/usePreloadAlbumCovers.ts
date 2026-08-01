import { useEffect } from "react"
import useAlbums from "./useAlbums"

const usePreloadAlbumCovers = () => {
  const { data: albums } = useAlbums()

  useEffect(() => {
    if (!albums) return

    albums.covers.forEach((cover) => {
      const img = new Image()
      img.src = cover
    })
  }, [albums])
}

export default usePreloadAlbumCovers

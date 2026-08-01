import { getAlbums } from "@/api/gameApi"
import { useQuery } from "@tanstack/react-query"

const useAlbums = () =>
  useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
    staleTime: Infinity,
  })

export default useAlbums

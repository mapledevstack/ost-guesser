import { useQuery } from "@tanstack/react-query"
import { getSession } from "@/api/gameApi"
import { useGame } from "./useGame"

const useSession = () => {
  const { mode } = useGame()

  return useQuery({
    queryKey: ["session", mode],
    queryFn: () => getSession(mode),
  })
}

export default useSession

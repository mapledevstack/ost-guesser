import { postGuess } from "@/api/gameApi"
import { useGame } from "./useGame"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PostGuessRequest } from "@/schema/gameSchema"
import useSession from "./useSession"

const useGuess = () => {
  const { mode } = useGame()
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sessionId, guesses }: PostGuessRequest) =>
      postGuess(mode, sessionId, guesses),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session", mode] })

      if (session?.status !== "playing") {
        queryClient.invalidateQueries({ queryKey: ["me"] })
      }
    },
  })
}

export default useGuess

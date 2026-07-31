import { postGuess } from "@/api/gameApi"
import { useGame } from "./useGame"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PostGuessRequest } from "@/schema/gameSchema"

const useGuess = () => {
  const { mode } = useGame()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sessionId, guesses }: PostGuessRequest) =>
      postGuess(mode, sessionId, guesses),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session", mode] })
    },
  })
}

export default useGuess

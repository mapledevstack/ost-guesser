import { postGuess } from "@/api/gameApi"
import { useGame } from "./useGame"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { PostGuessRequest, Session } from "@/schema/gameSchema"

const useGuess = () => {
  const { mode } = useGame()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sessionId, guesses }: PostGuessRequest) =>
      postGuess(mode, sessionId, guesses),

    onSuccess: (result) => {
      queryClient.setQueryData<Session>(["session", mode], (old) => {
        if (!old) return old

        return {
          ...old,
          ...result,
        }
      })
    },
  })
}

export default useGuess

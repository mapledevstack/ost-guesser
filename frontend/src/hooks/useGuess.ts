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

    onSuccess: (data) => {
      queryClient.setQueryData(["session", mode], data)

      if (data.status !== "playing") {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        })
        queryClient.invalidateQueries({
          queryKey: ["session", mode],
        })
      }
    },
  })
}

export default useGuess

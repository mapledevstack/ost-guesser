import { startNextEndlessGame } from "@/api/gameApi"
import { useGame } from "./useGame"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useNextEndless = () => {
  const { mode } = useGame()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: startNextEndlessGame,

    onSuccess: (data) => {
      queryClient.setQueryData(["session", mode], data)
    },
  })
}

export default useNextEndless

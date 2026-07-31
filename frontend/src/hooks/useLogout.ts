import { logOut } from "@/api/authApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}

export default useLogout

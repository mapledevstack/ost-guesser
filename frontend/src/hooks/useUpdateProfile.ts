import { updateMe } from "@/api/userApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })
}

export default useUpdateProfile

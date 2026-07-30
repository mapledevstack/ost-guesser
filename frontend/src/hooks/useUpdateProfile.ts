import { updateUserData } from "@/api/userApi"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
    },
  })
}

export default useUpdateProfile

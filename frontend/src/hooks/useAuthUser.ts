import { getAuthUser } from "@/api/userApi"
import { useQuery } from "@tanstack/react-query"

const useAuthUser = () =>
  useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  })

export default useAuthUser

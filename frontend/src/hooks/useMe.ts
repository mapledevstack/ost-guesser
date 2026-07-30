import { getMe } from "@/api/authApi"
import { useQuery } from "@tanstack/react-query"

const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
  })

export default useMe

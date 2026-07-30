import { getMe } from "@/api/userApi"
import { useQuery } from "@tanstack/react-query"

const useMe = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  })

export default useMe

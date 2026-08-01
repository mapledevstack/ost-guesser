import { getMe } from "@/api/userApi"
import { useSuspenseQuery } from "@tanstack/react-query"

const useMe = () =>
  useSuspenseQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: Infinity,
  })

export default useMe

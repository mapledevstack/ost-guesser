import { getUserData } from "@/api/userApi"
import { useQuery } from "@tanstack/react-query"

const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: getUserData,
    retry: false,
  })

export default useUser

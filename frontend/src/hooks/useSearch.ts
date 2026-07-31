import { search } from "@/api/gameApi"
import { useQuery } from "@tanstack/react-query"

const useSearch = (query: string) =>
  useQuery({
    queryKey: ["search", query],
    queryFn: () => search(query),
    enabled: !!query,
  })

export default useSearch

import useSearch from "@/hooks/useSearch"
import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { cn } from "@/utils/cn"

const Search = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: results = [] } = useSearch(query)

  return (
    <div className="w-full p-4">
      <Input
        ref={inputRef}
        placeholder="Enter your guess"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div
        className={cn(
          "fixed overflow-y-auto rounded-md bg-accent p-2",
          !isFocused && "hidden"
        )}
        style={{
          top: inputRef.current
            ? inputRef.current.getBoundingClientRect().bottom + 12
            : 0,
          left: inputRef.current
            ? inputRef.current.getBoundingClientRect().left
            : 0,
          width: inputRef.current
            ? inputRef.current.getBoundingClientRect().width
            : 0,
          maxHeight: inputRef.current
            ? window.innerHeight -
              inputRef.current.getBoundingClientRect().bottom -
              28
            : 0,
        }}
      >
        {results.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">
            No results found
          </p>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className="flex w-full cursor-pointer items-center justify-between p-2 transition-colors duration-75 hover:bg-primary/50"
            >
              <p>{result.name}</p>

              <p className="text-muted-foreground capitalize italic">
                {result.type}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Search

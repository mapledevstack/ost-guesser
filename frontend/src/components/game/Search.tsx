import useSearch from "@/hooks/useSearch"
import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { cn } from "@/utils/cn"
import useGuess from "@/hooks/useGuess"
import useSession from "@/hooks/useSession"
import { toast, Toaster } from "../ui/toast"

const Search = () => {
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: results = [] } = useSearch(query)
  const { mutate: makeGuess } = useGuess()
  const { data: session } = useSession()

  if (!session) return null
  return (
    <div className="w-full p-4">
      <Input
        ref={inputRef}
        placeholder="Enter your guess"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={session.status !== "playing"}
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
              key={result.name}
              className="flex w-full cursor-pointer items-center justify-between p-2 transition-colors duration-75 hover:bg-primary/50"
              onMouseDown={(e) => {
                e.preventDefault()

                if (
                  session.guesses.some(
                    (guess) =>
                      guess.name === result.name && guess.type === result.type
                  )
                ) {
                  toast.add({
                    title: "Already guessed",
                    description: `${result.name} was alraeady guessed`,
                  })

                  return
                }

                makeGuess({
                  sessionId: session.sessionId,
                  guesses: session.guesses.concat({
                    name: result.name,
                    type: result.type,
                  }),
                })

                setQuery("")
                inputRef.current?.blur()
              }}
            >
              <p>{result.name}</p>

              <p className="text-muted-foreground capitalize italic">
                {result.type}
              </p>
            </div>
          ))
        )}
      </div>
      <Toaster />
    </div>
  )
}

export default Search

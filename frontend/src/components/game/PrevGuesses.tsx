import useSession from "@/hooks/useSession"

const PrevGuesses = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="w-full">
      <table className="-mt-6 -mb-6 w-full border-separate border-spacing-y-2 p-4">
        <tbody>
          {session.guesses.map((guess, index) => {
            const isCorrect =
              session.status === "won" && index === session.guesses.length - 1

            return (
              <tr
                key={`${guess.type}-${guess.name}`}
                className={isCorrect ? "bg-green-500/10" : "bg-red-500/10"}
              >
                <td
                  className={`rounded-l-md border-y border-l p-2 ${
                    isCorrect ? "border-green-500/20" : "border-red-500/20"
                  }`}
                >
                  {guess.name}
                </td>

                <td
                  className={`border-y p-2 capitalize italic ${
                    isCorrect ? "border-green-500/20" : "border-red-500/20"
                  }`}
                >
                  {guess.type}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default PrevGuesses

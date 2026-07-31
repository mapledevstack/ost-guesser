import useSession from "@/hooks/useSession"

const PrevGuesses = () => {
  const { data: session } = useSession()

  if (!session) return null

  return (
    <div className="w-full">
      <table className="-mt-6 -mb-6 w-full border-separate border-spacing-y-2 p-4">
        <tbody>
          {session.guesses.map((guess) => (
            <tr key={`${guess.type}-${guess.name}`} className="bg-red-500/10">
              <td className="rounded-l-md border-y border-l border-red-500/20 p-2">
                {guess.name}
              </td>
              <td className="border-y border-red-500/20 p-2 capitalize italic">
                {guess.type}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PrevGuesses

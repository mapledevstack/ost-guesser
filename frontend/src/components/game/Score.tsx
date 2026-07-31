import { CardContent, CardHeader } from "../ui/card"

type ScoreProps = {
  title: string
  score: number
}

const Score = ({ title, score }: ScoreProps) => {
  return (
    <div className="w-full rounded-xl bg-accent p-3">
      <CardHeader className="text-center text-[0.65rem] font-bold whitespace-nowrap uppercase">
        {title}
      </CardHeader>

      <CardContent className="text-center text-2xl">{score}</CardContent>
    </div>
  )
}

export default Score

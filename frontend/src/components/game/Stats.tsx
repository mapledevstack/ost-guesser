import { useGame } from "@/hooks/useGame"
import Score from "./Score"
import useMe from "@/hooks/useMe"

const Stats = () => {
  const { data: user } = useMe()
  const { mode } = useGame()

  const dailyStats = user.gameStats.daily
  const endlessStats = user.gameStats.endless

  return (
    <div className="flex justify-center gap-2 p-6 lg:w-full">
      {mode === "daily" ? (
        <>
          <Score title="Games Played" score={dailyStats.gamesPlayed} />
          <Score title="Current Streak" score={dailyStats.currentStreak} />
          <Score title="Best Streak" score={dailyStats.bestStreak} />
          <Score title="Score" score={dailyStats.score} />
        </>
      ) : (
        <>
          <Score title="Games Played" score={endlessStats.gamesPlayed} />
          <Score title="Total Score" score={endlessStats.totalScore} />
          <Score title="Best Score" score={endlessStats.bestScore} />
          <Score title="Current Streak" score={endlessStats.currentStreak} />
          <Score title="Best Streak" score={endlessStats.bestStreak} />
        </>
      )}
    </div>
  )
}

export default Stats

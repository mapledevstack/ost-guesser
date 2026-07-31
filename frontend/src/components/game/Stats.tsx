import useUser from "@/hooks/useAuthUser"
import { useGame } from "@/hooks/useGame"
import Score from "./Score"

const Stats = () => {
  const { data: user } = useUser()
  const { mode } = useGame()

  if (!user) return null

  const dailyStats = user.gameStats.daily
  const endlessStats = user.gameStats.endless

  return (
    <div className="flex w-full justify-center gap-2 p-6">
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

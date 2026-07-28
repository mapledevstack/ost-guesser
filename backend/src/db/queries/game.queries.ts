import db from "../index.js"

export const getDailyGameByDate = async (date: string) => {
  return db.query.dailyGames.findFirst({ where: { date } })
}

import { createContext, type ReactNode } from "react"

export type GameMode = "daily" | "endless"

export type GameContextType = {
  mode: GameMode
}

export const GameContext = createContext<GameContextType | null>(null)

type Props = {
  mode: GameMode
  children: ReactNode
}

export const GameProvider = ({ mode, children }: Props) => {
  return (
    <GameContext.Provider value={{ mode }}>{children}</GameContext.Provider>
  )
}

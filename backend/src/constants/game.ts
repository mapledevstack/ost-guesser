export const MAX_GUESSES = 6

export const BASE_SCORES = {
  track: 50,
  artist: 40,
  album: 30,
  character: 20,
} as const

export const MULTIPLIERS = [2.0, 1.5, 1.2, 1.0, 0.8, 0.5] as const

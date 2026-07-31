export const FIFTEEN_MINUTES_MS = 15 * 60 * 1000

export const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000

export const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

export const getCurrentDate = () =>
  Intl.DateTimeFormat("en-CA").format(new Date())

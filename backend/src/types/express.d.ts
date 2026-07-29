declare global {
  namespace Express {
    type Auth =
      | {
          type: "user"
          userId: string
        }
      | {
          type: "guest"
          guestId: string
        }

    interface Request {
      auth: Auth
    }
  }
}

export {}

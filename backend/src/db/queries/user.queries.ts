import { INTERNAL_SERVER_ERROR } from "../../constants/http.js"
import appAssert from "../../utils/appAssert.js"
import db from "../index.js"
import { users } from "../schema.js"

type CreateUserInput = typeof users.$inferInsert

export const createUser = async (data: CreateUserInput) => {
  const [user] = await db.insert(users).values(data).returning()

  appAssert(user, INTERNAL_SERVER_ERROR, "Failed to create user")

  return user
}

export const getUserByGoogleId = async (googleId: string) => {
  return db.query.users.findFirst({
    where: { googleId },
  })
}

export const getUserById = async (id: string) => {
  return db.query.users.findFirst({
    where: { id },
  })
}

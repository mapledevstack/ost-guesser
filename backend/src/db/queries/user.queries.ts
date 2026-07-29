import { eq } from "drizzle-orm"
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

export const updateUser = async (
  id: string,
  values: {
    displayName?: string
    avatarUrl?: string
  },
) => {
  const [user] = await db
    .update(users)
    .set(values)
    .where(eq(users.id, id))
    .returning()

  appAssert(user, INTERNAL_SERVER_ERROR, "Failed to update user")

  return user
}

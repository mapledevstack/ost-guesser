import api from "@/config/axios"
import { UserSchema, type UpdateProfileType } from "@/schema/userSchema"

export const getMe = async () => {
  const res = await api.get("/user/me")

  return UserSchema.parse(res.data)
}

export const updateMe = async (data: UpdateProfileType) =>
  api.patch("/user/me", data)

import api from "@/config/axios"
import {
  AuthUserSchema,
  MeSchema,
  type UpdateProfileType,
} from "@/schema/userSchema"

export const getMe = async () => {
  const res = await api.get("/user/me")

  return MeSchema.parse(res.data)
}

export const getUserData = async () => {
  const res = await api.get("/user/profile")

  return AuthUserSchema.parse(res.data)
}

export const updateUserData = async (data: UpdateProfileType) =>
  api.patch("/user/profile", data)

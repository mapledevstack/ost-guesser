import api from "@/config/axios"
import { AuthUserSchema, MeSchema } from "@/schema/userSchema"

export const getMe = async () => {
  const res = await api.get("/user/me")

  return MeSchema.parse(res.data)
}

export const getAuthUser = async () => {
  const res = await api.get("/user/profile")

  return AuthUserSchema.parse(res.data)
}

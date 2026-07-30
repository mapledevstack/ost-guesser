import api from "@/config/axios"
import { UserSchema } from "@/schema/userSchema"

export const getMe = async () => {
  const res = await api.get("/auth/me")

  return UserSchema.parse(res.data)
}

export const logOut = async () => {
  await api.post("/auth/logout")
}

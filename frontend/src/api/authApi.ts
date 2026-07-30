import api from "@/config/axios"
import { MeSchema } from "@/schema/userSchema"

export const getMe = async () => {
  const res = await api.get("/auth/me")

  return MeSchema.parse(res.data)
}

export const logOut = async () => {
  await api.post("/auth/logout")
}

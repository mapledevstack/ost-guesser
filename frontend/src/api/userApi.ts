import api from "@/config/axios"
import { UserSchema } from "@/schema/userSchema"

export const getMe = async () => {
  const res = await api.get("/users/me")

  return UserSchema.parse(res.data)
}

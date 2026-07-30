import api from "@/config/axios"
import { AuthUserSchema } from "@/schema/userSchema"

export const getAuthUser = async () => {
  const res = await api.get("/users/me")

  return AuthUserSchema.parse(res.data)
}

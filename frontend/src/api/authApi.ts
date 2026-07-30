import api from "@/config/axios"

export const logOut = async () => {
  await api.post("/auth/logout")
}

import z from "zod"

export const UpdateProfileSchema = z.object({
  displayName: z.string().trim().min(1).max(32).optional(),
  avatarUrl: z.url().optional(),
})

export type UpdateProfileType = z.infer<typeof UpdateProfileSchema>

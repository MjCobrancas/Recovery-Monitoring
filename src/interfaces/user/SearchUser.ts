import { z } from "zod"

export const createSearchUserFormSchema = z.object({
    searchUser: z.string().min(1, "Digite no campo de usuário!"),
})

export type createSearchUserFormData = z.infer<typeof createSearchUserFormSchema>


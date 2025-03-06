import { z } from "zod";
import { IGetUserPermission } from "../generics/IGetUserPermission";

interface IContainerChangePasswordProps {
    user: IGetUserPermission
}

export const IContainerChangePasswordSchema = z.object({
    old_password: z.string().min(1),
    new_password: z.string().min(1),
    new_confirm_password: z.string().min(1)
})

type IContainerChangePasswordData = z.infer<typeof IContainerChangePasswordSchema>

export type { IContainerChangePasswordProps, IContainerChangePasswordData }

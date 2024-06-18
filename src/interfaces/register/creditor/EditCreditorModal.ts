import { z } from "zod"

interface IEditCreditorModal {
    Id_Creditor: number
}

interface IEditRequestCreditorModal {
    Creditor: string
    Identifier: number
    Returns: number
    Target: number
    Number_Operators: number
    Working_Days: number
}

export const editCreditorModalSchema = z.object({
    creditor:  z.string().min(1),
    identifier: z.string().refine((value) => {
        return value == "1"
    }),
    returns: z.string().min(1),
    meta: z.string().min(1),
    operatorsNumber: z.string().min(1),
    workingDays: z.string().min(1)
})

export type { IEditCreditorModal, IEditRequestCreditorModal }
export type editCreditorModalData = z.infer<typeof editCreditorModalSchema>
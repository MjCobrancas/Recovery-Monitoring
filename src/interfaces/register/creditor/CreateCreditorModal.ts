import { z } from "zod"

export const createCreditorModalSchema = z.object({
    idCreditor: z.string().min(1),
    creditor:  z.string().min(1),
    identifier: z.string().refine((value) => {
        return value == "1"
    }),
    returns: z.string().min(1),
    meta: z.string().min(1),
    operatorsNumber: z.string().min(1),
    workingDays: z.string().min(1)
})

export type createCreditorModalData = z.infer<typeof createCreditorModalSchema>
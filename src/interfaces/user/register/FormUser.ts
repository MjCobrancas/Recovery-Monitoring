import { validDate } from "@/utils/ValidDate";
import { z } from "zod";

export const CreateUserFormSchema = z.object({
    name: z.string().min(1).max(50),
    lastName: z.string().min(1).max(120),
    userName: z.string().min(1).max(50),
    password: z.string().min(1),
    mother: z.string(),
    father: z.string(),
    birthDate: z.string().refine((value) => {
        const verifyBirthDate = validDate(value, true)

        return verifyBirthDate
    }),
    admission: z.string().refine((value) => {
        const verifyAdmission = validDate(value)

        return verifyAdmission
    }),
    cpf: z.string().min(1).refine(async (value) => {
        const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/g
        const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/g

        const isCPF = regexCPF.test(value)
        const isCNPJ = regexCNPJ.test(value)

        return isCPF || isCNPJ
    }),
    dismissal: z.string(),
    position: z.string().min(1).max(50),
    permission: z.enum(["", "1", "2", "3", "4", "5", "6"]).refine((value) => {
        if (Number(value) >= 1 && Number(value) <= 6) {
            return true
        }
    }),
    maritalStatus: z.enum(["", "1", "2", "3", "4", "5"]).refine((value) => {
        if (Number(value) >= 1 && Number(value) <= 6) {
            return true
        }
    }),
    educationStatus: z.enum(["", "1", "2", "3", "4", "5", "6", "7", "8", "9"]).refine((value) => {
        if (Number(value) >= 1 && Number(value) <= 6) {
            return true
        }
    }),
    id_credor: z.string().min(1)
})

export type CreateUserFormData = z.infer<typeof CreateUserFormSchema>

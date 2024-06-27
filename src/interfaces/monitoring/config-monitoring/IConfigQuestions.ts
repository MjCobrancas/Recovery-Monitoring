import { z } from "zod";
import { IQuestionsResponse } from "./IHeaderSelectConfig";
import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors";

interface IConfigQuestionsProps {
    questionsList: IQuestionsResponse
    idCreditor: number
    idOcorrence: number
    idAging: number
    resetAllValues: Function
    setValueDisableAllButtons: (value: boolean) => void
    disableAllButtons: boolean
    creditors: ICreditorGetAllCreditors[]
}

export const IConfigFormSchema = z.object({
    questions: z.array(
        z.object({
            idQuestion: z.number().min(1),
            question: z.string().min(1),
            note: z.string().or(z.number()).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            position: z.number().min(1),
            isBehavioral: z.boolean()
        })
    ),
    behavioral: z.array(
        z.object({
            idQuestion: z.number().min(1),
            question: z.string().min(1),
            note: z.string().or(z.number()).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            position: z.number(),
            isBehavioral: z.boolean()
        })
    )
})

export type { IConfigQuestionsProps }
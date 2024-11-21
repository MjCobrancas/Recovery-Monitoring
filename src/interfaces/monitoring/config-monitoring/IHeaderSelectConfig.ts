import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors";
import { z } from "zod";

interface IHeaderSelectConfigProps {
    creditors: ICreditorGetAllCreditors[]
    setValueQuestionList: (value: IQuestionsResponse, showQuestions: boolean) => void
    setValuesHeader: (id_creditor: number, id_creditor_unique: number, id_ocorrence: number, id_aging: number) => void
    setValueDisableAllButtons: (value: boolean) => void
    disableAllButtons: boolean
}

interface IHeaderSelectConfigForm {
    id_creditor: string
    id_creditor_unique: string
    id_ocorrence: string
    id_aging: string
}

export const IHeaderSelectConfigSchema = z.object({
    id_creditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    id_creditor_unique: z.string().min(1).refine((value) => {

        if (value == "disabled") {
            return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    id_ocorrence: z.string().min(1).refine((value) => {
        if (value == "disabled") {
            return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    id_aging: z.string().min(1).refine((value) => {
        if (value == "disabled") {
            return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

interface IQuestionsResponse {
    behavioral: IQuestionsBehavioral[]
    generic: IQuestionsGeneric[]
    questions: IQuestionsNegotiation[]
}

interface IQuestionsBehavioral {
    question: string
    idQuestion: number
    position: number
    note: number
    isBehavioral: boolean
}

interface IQuestionsGeneric {
    question: string
    idQuestion: number
    isBehavioral: boolean
}

interface IQuestionsNegotiation {
    question: string
    idQuestion: number
    position: number
    note: number
    isBehavioral: boolean
}

export type { IHeaderSelectConfigProps, IHeaderSelectConfigForm, IQuestionsResponse, IQuestionsNegotiation, IQuestionsBehavioral, IQuestionsGeneric }
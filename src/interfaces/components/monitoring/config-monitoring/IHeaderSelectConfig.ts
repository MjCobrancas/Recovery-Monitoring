import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors";
import { z } from "zod";

interface IHeaderSelectConfigProps {
    creditors: ICreditorGetAllCreditors[]
    setValueQuestionList: (value: IQuestionsResponse, showQuestions: boolean) => void
}

interface IHeaderSelectConfigForm {
    id_creditor: string
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
    behavioral: {
        question: string
        idQuestion: number
        position: number
        note: number
        isBehavioral: boolean
    }[]
    generic: {
        question: string
        idQuestion: number
        isBehavioral: boolean
    }[]
    questions: {
        question: string
        idQuestion: number
        position: number
        note: number
        isBehavioral: false
    }[]
}

export type { IHeaderSelectConfigProps, IHeaderSelectConfigForm, IQuestionsResponse }
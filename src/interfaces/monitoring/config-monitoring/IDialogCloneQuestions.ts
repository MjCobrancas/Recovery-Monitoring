import { RefObject } from "react"
import { IQuestionsResponse } from "./IHeaderSelectConfig"
import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors"

interface IDialogCloneQuestionsProps {
    questionsList: IQuestionsResponse
    dialogCloneQuestions:  RefObject<HTMLDialogElement | null>
    creditors: ICreditorGetAllCreditors[]
    headerObject: {
        id_creditor_unique: number
        id_ocorrence: number
        id_aging: number
    }
}

export type { IDialogCloneQuestionsProps }
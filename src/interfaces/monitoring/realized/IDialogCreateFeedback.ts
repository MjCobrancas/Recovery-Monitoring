import { IBackOffices } from "@/interfaces/generics/IBackOffices";
import { IMonitoryAllUsers } from "./IContainerMonitoryRealized";
import { z } from "zod";

interface IDialogCreateFeedbackProps {
    feedbackInfo: IMonitoryAllUsers | null
    userFeedbackIndex: number
    backOffices: IBackOffices[]
    closeDialogFeedback: Function
    disableAllButtons: boolean
    setValueDisableButtons: (value: boolean) => void
    setValueReloadTable: (value: boolean) => void
}

export const IDialogCreateFormSchema = z.object({
    responsable: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type { IDialogCreateFeedbackProps }
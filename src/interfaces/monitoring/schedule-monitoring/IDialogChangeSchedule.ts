import { z } from "zod";
import { ISchedulesResponse } from "./ISchedules";

interface IDialogChangeScheduleProps {
    userSchedule: ISchedulesResponse | null
    closeDialog: () => void
}

export const IDialogChangeScheduleFormSchema = z.object({
    newDate: z.string().min(1).refine((value) => {
        const regexDate = /\d{4}-\d{2}-\d{2}/g

        if (!regexDate.test(value)) {
            return false
        }

        return true
    })
})

export type { IDialogChangeScheduleProps }

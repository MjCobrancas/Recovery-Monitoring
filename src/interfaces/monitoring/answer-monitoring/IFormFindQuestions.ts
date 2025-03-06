import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IScheduleUser } from "../schedule-monitoring/ISchedules";
import { IScheduleAnswerId } from "./IAnswerScheduleId";
import { z } from "zod";
import { IMonitoringResponse } from "./IAnswerMonitoringQuestions";
import { Dispatch, SetStateAction } from "react";
import { ISupervisors } from "@/interfaces/generics/ISupervisors";

interface IFormFindQuestions {
    schedule: IScheduleUser[]
    config: IScheduleAnswerId[]
    creditorsUnique: ICreditorsUnique[]
    setQuestionsValue: (data: IMonitoringResponse | null) => void
    setValueIdCreditorUnique: (id_creditor_unique: number) => void
    setValueIdAging: (id_aging: number) => void
    isSpecialCreditor: boolean
    setResponsablesList: Dispatch<SetStateAction<ISupervisors[]>>
}

export const IFormFindQuestionsSchema = z.object({
    id_creditor_unique: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    id_aging: z.string().min(1)
})

export type { IFormFindQuestions }

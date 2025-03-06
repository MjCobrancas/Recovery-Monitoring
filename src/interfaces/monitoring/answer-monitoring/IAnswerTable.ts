import { ISupervisors } from "@/interfaces/generics/ISupervisors";
import { IMonitoringResponse } from "./IAnswerMonitoringQuestions";
import { IScheduleAnswerId } from "./IAnswerScheduleId";

interface IAnswerTable {
    config: IScheduleAnswerId[]
    idSchedule: Number
    questions: IMonitoringResponse
    idCreditorUnique: number
    idAging: number
    isSpecialCreditor: boolean
    idCreditor: number
    responsablesList: ISupervisors[]
}

export type { IAnswerTable };

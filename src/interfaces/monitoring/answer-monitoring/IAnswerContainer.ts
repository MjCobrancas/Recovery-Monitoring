import { IBackOffice } from "@/interfaces/generics/IBackOffice";
import { IMonitoringResponse } from "./IAnswerMonitoringQuestions";
import { IScheduleAnswerId } from "./IAnswerScheduleId";

interface IAnswerMonitoringContainer {
    questions: IMonitoringResponse
    backOffices: IBackOffice[]
    config: IScheduleAnswerId[]
    idSchedule: Number
}

export type { IAnswerMonitoringContainer }
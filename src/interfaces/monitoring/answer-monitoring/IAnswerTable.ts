import { IScheduleUser } from "../schedule-monitoring/ISchedules";
import { IAnswerMonitoringContainer } from "./IAnswerContainer";
import { IMonitoringResponse } from "./IAnswerMonitoringQuestions";
import { IScheduleAnswerId } from "./IAnswerScheduleId";

interface IAnswerTable {
    config: IScheduleAnswerId[]
    idSchedule: Number
    questions: IMonitoringResponse
    idCreditorUnique: number
}

export type { IAnswerTable }
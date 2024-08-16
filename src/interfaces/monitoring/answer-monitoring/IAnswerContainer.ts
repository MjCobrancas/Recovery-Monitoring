import { IMonitoringResponse } from "./IAnswerMonitoringQuestions";
import { IScheduleAnswerId } from "./IAnswerScheduleId";

interface IAnswerMonitoringContainer {
    questions: IMonitoringResponse
    config: IScheduleAnswerId[]
    idSchedule: Number
}

export type { IAnswerMonitoringContainer }
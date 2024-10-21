import { ISchedules, IScheduleUser } from "../schedule-monitoring/ISchedules";
import { IMonitoringResponse } from "./IAnswerMonitoringQuestions";
import { IScheduleAnswerId } from "./IAnswerScheduleId";

interface IAnswerMonitoringContainer {
    questions: IMonitoringResponse
    config: IScheduleAnswerId[]
    idSchedule: Number
    schedule: IScheduleUser[]
}

export type { IAnswerMonitoringContainer }
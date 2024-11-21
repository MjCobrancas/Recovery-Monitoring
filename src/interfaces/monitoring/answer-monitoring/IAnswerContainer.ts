import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IScheduleUser } from "../schedule-monitoring/ISchedules";
import { IScheduleAnswerId } from "./IAnswerScheduleId";

interface IAnswerMonitoringContainer {
    config: IScheduleAnswerId[]
    idSchedule: Number
    schedule: IScheduleUser[]
    creditorsUnique: ICreditorsUnique[]
    isSpecialCreditor: boolean
}

export type { IAnswerMonitoringContainer };

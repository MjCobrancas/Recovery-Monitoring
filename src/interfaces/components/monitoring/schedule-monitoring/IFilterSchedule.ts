import { ICreditors } from "@/interfaces/generics/ICreditors";
import { z } from "zod";
import { IScheduleDataContainer, ISchedulesResponse } from "./ISchedules";

interface IFilterScheduleOcorrences {
    ocorrence: {
        Id_Ocorrence: number;
        Ocorrence: string;
        Status: boolean;
        Id_Status_Ocorrence: number;
        cpc: boolean;
        Status_Name: string;
    }[]
}

interface IFilterSchedule {
    creditors: ICreditors[];
    ocorrences: IFilterScheduleOcorrences;
    setFilter: (value: ISchedulesResponse[]) => void
}

export const scheduleMonitorinSchema = z.object({
    creditor: z.string(),
    ocorrences: z.string(),
    data: z.string(),
    name: z.string()
})

export type scheduleMonitoringData = z.infer<typeof scheduleMonitorinSchema>

export type { IFilterScheduleOcorrences, IFilterSchedule };

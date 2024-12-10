import { z } from "zod"
import { IMonitoringGraphicsChartConfig, IMonitoringGraphicsSupervisor } from "./IContainerGraphicsSupervisor"

interface IFilterGraphicsSupervisorProps {
    graphicsSupervisorData: IMonitoringGraphicsSupervisor | null
    setValueGraphicsSupervisor: (graphicsSupervisor: IMonitoringGraphicsSupervisor | null) => void
    setValueGraphicsChartConfig: (chartConfig: IMonitoringGraphicsChartConfig | null) => void
    setValueCountCreditor: (count: number) => void
}

interface IFilterGraphicsSupervisorData {
    date_init: string
    date_end: string
    supervisors: {
        Id_Supervisor: number
        Supervisor: string
        Status: boolean
    }[]
}

export const IFilterGraphicsSupervisorSchema = z.object({
    date_init: z.string().min(1).refine((value) => {
        const regexDateInit = /\d{4}-\d{2}-\d{2}/g

        if (!regexDateInit.test(value)) {
            return false
        }

        return true
    }),
    date_end: z.string().min(1).refine((value) => {
        const regexDateEnd = /\d{4}-\d{2}-\d{2}/g

        if (!regexDateEnd.test(value)) {
            return false
        }

        return true
    }),
    supervisors: z.array(
        z.object({
            Id_Supervisor: z.number().min(1).refine((value) => {
                if (String(Number(value)) == "NaN") {
                    return false
                }

                if (Number(value) <= 0) {
                    return false
                }

                return true
            }),
            Supervisor: z.string().min(1),
            Status: z.boolean()
        })
    )
})

export type { IFilterGraphicsSupervisorProps, IFilterGraphicsSupervisorData }

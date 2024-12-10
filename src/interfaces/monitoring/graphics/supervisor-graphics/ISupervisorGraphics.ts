import { IMonitoringGraphicsChartConfig, IMonitoringGraphicsSupervisor } from "./IContainerGraphicsSupervisor";

interface ISupervisorGraphicsProps {
    graphicsSupervisor: IMonitoringGraphicsSupervisor | null
    countCreditor: number
    setValueCountCreditor: (value: number) => void
    graphicsChartConfig: IMonitoringGraphicsChartConfig | null
}

export type { ISupervisorGraphicsProps }

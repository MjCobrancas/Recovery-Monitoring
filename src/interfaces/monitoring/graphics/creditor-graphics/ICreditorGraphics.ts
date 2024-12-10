import { IMonitoringGraphicsResponse } from "../IMonitoringGraphics";

interface ICreditorGraphicsProps {
    graphics: IMonitoringGraphicsResponse
    count: number
    setCount: (index: number) => void
}

export type { ICreditorGraphicsProps }

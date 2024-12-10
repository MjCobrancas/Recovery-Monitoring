interface IMonitoringGraphicsSupervisor {
    creditors: IMonitoringGraphicsSupervisorCreditors[]
}

interface IMonitoringGraphicsSupervisorCreditors {
    name: string
    supervisor: IMonitoringGraphicsSupervisorQuantity[]
    total: number
}

interface IMonitoringGraphicsSupervisorQuantity {
    name: string
    quantity: number
    color: string
}

type IMonitoringGraphicsChartConfig = {
    [k in string]: {
        label: string
        color: string
    }
}

export type { IMonitoringGraphicsSupervisor, IMonitoringGraphicsChartConfig }

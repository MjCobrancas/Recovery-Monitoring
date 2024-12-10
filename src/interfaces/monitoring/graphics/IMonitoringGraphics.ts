interface IMonitoringGraphicsResponse {
    creditor: {
        name: string
        ocorrences: IMonitoringGraphicsOcorrences[]
    }
}

interface IMonitoringGraphicsOcorrences {
    name: string
    grade_value_average: number
    grade_value_behavioral_average: number
    agings: IMonitoringGraphicsAgings[]
}

interface IMonitoringGraphicsAgings {
    name: string
    grade_value: number
    grade_value_behavioral: number
    quantity: number
}

export type { IMonitoringGraphicsResponse }

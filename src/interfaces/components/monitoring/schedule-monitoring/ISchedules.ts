import { ICreditors } from "@/interfaces/generics/ICreditors"
import { IFilterSchedule, IFilterScheduleOcorrences } from "./IFilterSchedule"

interface ISchedules {
    agendas: {
        data: ISchedulesResponse[] | []
        count: number
        quantity: ISchedulesQuantity
    }
    status: boolean
}

interface ISchedulesData {
    schedules: {
        data: ISchedulesResponse[] | []
        count: number
        quantity: ISchedulesQuantity
    }
}

interface IScheduleTable extends ISchedulesData {
    filter: ISchedulesResponse[]
}

interface IScheduleDataContainer extends ISchedulesData {
    creditors: ICreditors[]
    ocorrences: IFilterScheduleOcorrences
}

interface ISchedulesResponse {
    Name: string
    Last_Name: string
    Id_User: number 
    Creditor: string
    Id_Creditor: number
    Ocorrence: string
    Id_Ocorrence: number
    Description: string
    id_quantity: number
    Date: string
    Data: string
}

interface ISchedulesQuantity {
    late: number
    today: number
    future: number
    negotiators: number
}

export type { ISchedules, ISchedulesResponse, ISchedulesData, IScheduleDataContainer, ISchedulesQuantity, IScheduleTable }
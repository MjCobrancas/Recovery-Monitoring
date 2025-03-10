import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique"
import { IFilterScheduleOcorrences } from "./IFilterSchedule"

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

interface IScheduleUser {
    Name: string
    Last_Name: string
    UserName: string
    Creditor: string
    Ocorrence: string
    Description: string
}

interface IScheduleTable extends ISchedulesData {
    filter: ISchedulesResponse[]
}

interface IScheduleDataContainer extends ISchedulesData {
    creditorsUnique: ICreditorsUnique[]
    ocorrences: IFilterScheduleOcorrences
}

interface ISchedulesResponse {
    Name: string
    Last_Name: string
    UserName: string
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

export type { IScheduleDataContainer, ISchedules, ISchedulesData, ISchedulesQuantity, ISchedulesResponse, IScheduleTable, IScheduleUser }

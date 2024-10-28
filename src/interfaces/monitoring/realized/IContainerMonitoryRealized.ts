import { IBackOffices } from "@/interfaces/generics/IBackOffices"
import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences"
import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors"

interface IContainerMonitoryRealizedProps {
    monitoryUsers: IMonitoryAllUsers[]
    creditors: ICreditorGetAllCreditors[]
    ocorrences: IGetAllOcorrences
    backOffices: IBackOffices[]
    supervisor: IBackOffices[]
}

interface IMonitoryAllUsers {
    Negotiator_Id: number
    Name: string
    Last_Name: string
    Evaluator_Id: number
    Id_Credor: number
    Creditor: string
    Ocorrence_Id: number
    Ocorrence: string
    Description: string
    Observation: string
    Is_Loose_Monitoring: boolean
    Evaluator_Name: string
    Id_Form: number
    Grade_Value: number
    Grade_Value_Behavioral: number
    Creation_DT: string
    Date: string
    FeedbackDate: string | null
    FeedbackResponsable: string | null
}

export type { IContainerMonitoryRealizedProps, IMonitoryAllUsers }
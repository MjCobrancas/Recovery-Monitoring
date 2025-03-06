import { IBackOffices } from "@/interfaces/generics/IBackOffices"
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique"
import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences"
import { ISupervisors } from "@/interfaces/generics/ISupervisors"

interface IContainerMonitoryRealizedProps {
    monitoryUsers: IMonitoryAllUsers[]
    creditorsUnique: ICreditorsUnique[]
    ocorrences: IGetAllOcorrences
    backOffices: IBackOffices[]
    avaliators: IBackOffices[]
    supervisors: ISupervisors[]
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
    Responsable_Name: string
    Id_Form: number
    Grade_Value: number
    Grade_Value_Behavioral: number
    Date: string
    FeedbackDate: string | null
    FeedbackResponsable: string | null
    Id_Unique_Creditor: number | null
    Creditor_Unique: string
}

export type { IContainerMonitoryRealizedProps, IMonitoryAllUsers }

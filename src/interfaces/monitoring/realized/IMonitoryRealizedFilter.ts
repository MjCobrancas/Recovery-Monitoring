import { IBackOffices } from "@/interfaces/generics/IBackOffices";
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences";
import { IMonitoryAllUsers } from "./IContainerMonitoryRealized";
import { ISupervisors } from "@/interfaces/generics/ISupervisors";

interface IMonitoryRealizedFilterProps {
    creditorsUnique: ICreditorsUnique[]
    ocorrences: IGetAllOcorrences
    disableAllButtons: boolean
    setValueDisableButtons: (value: boolean) => void
    setValueMonitoryRealized: (value: IMonitoryAllUsers[]) => void
    monitoryUsers: IMonitoryAllUsers[]
    setValueDidFilter: (value: boolean) => void
    reloadTable: boolean
    setValueReloadTable: (value: boolean) => void
    isDidFilter: boolean
    avaliators: IBackOffices[]
    supervisors: ISupervisors[]
}

interface IMonitoringObjectFilter {
    id_creditor: number
    id_ocorrence: number
    id_aging: number
    negotiator_name: string
    negotiator_last_name: string
    id_avaliator: number
    id_supervisor: number
    date_init: string
    date_end: string
    feedback: string
}

interface IMonitoryRealizedForm {
    supervisor: string
    avaliator: string
    credor: string
    ocorrence: string
    name: string
    Data: string
    DataEnd: string
    feedback: string
}

export type { IMonitoryRealizedFilterProps, IMonitoryRealizedForm, IMonitoringObjectFilter };

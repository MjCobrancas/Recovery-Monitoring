import { IBackOffices } from "@/interfaces/generics/IBackOffices";
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences";
import { IMonitoryAllUsers } from "./IContainerMonitoryRealized";

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
    supervisor: IBackOffices[]
}

interface IMonitoryRealizedForm {
    supervisor: string
    credor: string
    ocorrence: string
    name: string
    Data: string
    DataEnd: string
    feedback: string
}

export type { IMonitoryRealizedFilterProps, IMonitoryRealizedForm };

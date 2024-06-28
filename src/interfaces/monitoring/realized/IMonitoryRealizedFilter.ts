import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences";
import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors";
import { IMonitoryAllUsers } from "./IContainerMonitoryRealized";

interface IMonitoryRealizedFilterProps {
    creditors: ICreditorGetAllCreditors[]
    ocorrences: IGetAllOcorrences
    disableAllButtons: boolean
    setValueDisableButtons: (value: boolean) => void
    setValueMonitoryRealized: (value: IMonitoryAllUsers[]) => void
    monitoryUsers: IMonitoryAllUsers[]
    setValueDidFilter: (value: boolean) => void
    reloadTable: boolean
    setValueReloadTable: (value: boolean) => void
    isDidFilter: boolean
}

interface IMonitoryRealizedForm {
    credor: string
    ocorrence: string
    name: string
    Data: string
    DataEnd: string
    feedback: string
}

export type { IMonitoryRealizedFilterProps, IMonitoryRealizedForm }
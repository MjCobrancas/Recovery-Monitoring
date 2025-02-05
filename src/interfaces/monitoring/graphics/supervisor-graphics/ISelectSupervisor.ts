import { IGetGraphicsSupervisors } from "./IGetGraphicsSupervisors";

interface ISelectSupervisorProps {
    supervisors: IGetGraphicsSupervisors[]
    handleCheckAllSupervisors: (status: boolean) => void
    changeSupervisorStatus: (status: boolean, index: number) => void
    checkAllSupervisors: boolean
    disableAllButtons: boolean
    foundSupervisors: boolean
}

export type { ISelectSupervisorProps };


import { IGetGraphicsOperatorsResponse } from "./IFilterOperatorGraphics";

interface ISelectOperatorsProps {
    operators: IGetGraphicsOperatorsResponse[]
    handleCheckAllOperators: (status: boolean) => void
    changeOperatorStatus: (status: boolean, index: number) => void
    checkAllOperators: boolean
    disableAllButtons: boolean
    foundOperators: boolean
}

export type { ISelectOperatorsProps };


interface IOperatorGraphicsProps {
    graphics: IOperatorGraphicsResponse | null
    countOcorrence: number
    countAging: number
    handleSetCount: (id_ocorrence: number, id_aging: number) => void
}

interface IOperatorGraphicsResponse {
    creditor: {
        name: string
        ocorrences: IOperatorGraphicsOcorrences[]
    }
}

interface IOperatorGraphicsOcorrences {
    name: string
    agings: IOperatorGraphicsAgings[]
}

interface IOperatorGraphicsAgings {
    name: string
    operators: IOperatorsGraphicsOperators[]
}

interface IOperatorsGraphicsOperators {
    name: string
    grade_value: number
    grade_value_behavioral: number
    quantity: number
}

export type { IOperatorGraphicsResponse, IOperatorGraphicsProps }

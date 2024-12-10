import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { z } from "zod";
import { IOperatorGraphicsResponse } from "./IOperatorGraphics";

interface IFilterOperatorGraphicsProps {
    creditorsUniqueList: ICreditorsUnique[]
    graphicsOperators: IOperatorGraphicsResponse | null
    setValueGraphicsOperators: (graphics: IOperatorGraphicsResponse | null) => void
    handleSetCount: (indexOcorrence: number, indexAging: number) => void
}

interface IGetGraphicsOperatorsResponse {
    Id_User: number 
    Operator_Name: string
    Status: boolean
}

interface IFilterOperatorGraphicsData {
    id_creditor_unique: string
    date_init: string
    date_end: string
    operators: IGetGraphicsOperatorsResponse[]
}

export const IFilterOperatorGraphicsSchema = z.object({
    id_creditor_unique: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    date_init: z.string().min(1).refine((value) => {
        const regexDateInit = /\d{4}-\d{2}-\d{2}/g

        if (!regexDateInit.test(value)) {
            return false
        }

        return true
    }),
    date_end: z.string().min(1).refine((value) => {
        const regexDateEnd = /\d{4}-\d{2}-\d{2}/g

        if (!regexDateEnd.test(value)) {
            return false
        }

        return true
    }),
    operators: z.array(
        z.object({
            Id_User: z.number().min(1),
            Operator_Name: z.string().min(1),
            Status: z.boolean()
        })
    )
})

export type { IFilterOperatorGraphicsProps, IGetGraphicsOperatorsResponse, IFilterOperatorGraphicsData }

import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { IGetOperatorGraphic } from "./IGetOperatorGraphic";

interface IFilterOperatorGraphicTotalProps {
    operators: IGetAllOperators[]
    operatorGraphic: IGetOperatorGraphic[]
    setOperatorGraphic: Dispatch<SetStateAction<IGetOperatorGraphic[]>>
}

export const IFilterOperatorGraphicTotalSchema = z.object({
    id_operator: z.string().refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    date_init: z.string().refine((value) => {
        const regexDateInit = /^\d{4}-\d{2}-\d{2}$/g

        return regexDateInit.test(value)
    }),
    date_end: z.string().refine((value) => {
        const regexDateEnd = /^\d{4}-\d{2}-\d{2}$/g

        return regexDateEnd.test(value)
    })
})

type IFilterOperatorGraphicTotalData = z.infer<typeof IFilterOperatorGraphicTotalSchema>

export type { IFilterOperatorGraphicTotalData, IFilterOperatorGraphicTotalProps };


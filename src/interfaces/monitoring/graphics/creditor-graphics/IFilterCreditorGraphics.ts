import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { z } from "zod";
import { IMonitoringGraphicsResponse } from "../IMonitoringGraphics";

interface IFilterCreditorGraphics {
    creditorsUniqueList: ICreditorsUnique[]
    setValueGraphicsList: (graphicsObject: IMonitoringGraphicsResponse) => void
    graphicsDefaultValue: () => void
}

interface IFilterCreditorGraphicsData {
    id_creditor_unique: string
    date_init: string
    date_end: string
}

export const IFilterCreditorGraphicsSchema = z.object({
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
    })
})

export type { IFilterCreditorGraphics, IFilterCreditorGraphicsData }

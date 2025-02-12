import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { Dispatch, SetStateAction } from "react"
import { z } from "zod"
import { IGetMonitoringFeedbacks } from "../../IGetMonitoringFeedback"

interface IFilterFeedbackListProps {
    responsables: Omit<IGetAllOperators, "Status">[]
    operators: IGetAllOperators[]
    setFeedbacksList: Dispatch<SetStateAction<IGetMonitoringFeedbacks[]>>
    setFeedbackIndex: Dispatch<SetStateAction<number>>
}

export const IFilterFeedbackListSchema = z.object({
    id_operator: z.string(),
    id_responsable: z.string(),
    date_init: z.string().refine((value) => {
        const regexDateInit = /^\d{4}-\d{2}-\d{2}$/g

        return regexDateInit.test(value)
    }),
    date_end: z.string().refine((value) => {
        const regexDateEnd = /^\d{4}-\d{2}-\d{2}$/g

        return regexDateEnd.test(value)
    })
})

type IFilterFeedbackListData = z.infer<typeof IFilterFeedbackListSchema>

export type { IFilterFeedbackListProps, IFilterFeedbackListData }

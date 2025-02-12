import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";
import { z } from "zod";

interface IContainerCreateFeedbackProps {
    operators: IGetAllOperators[]
}

export const ICreateFeedbackSchema = z.object({
    id_operator: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    reason: z.string().min(1).max(255),
    observation: z.string().min(1).max(1200)
})

type ICreateFeedbackData = z.infer<typeof ICreateFeedbackSchema>

export type { IContainerCreateFeedbackProps, ICreateFeedbackData }

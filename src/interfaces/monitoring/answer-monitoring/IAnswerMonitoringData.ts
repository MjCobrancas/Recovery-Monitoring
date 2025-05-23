import { z } from "zod";

export const SubQuestionSchema = z.object({
    idSubquestion: z.number(),
    subquestion: z.string(),
    answer: z.boolean(),
    note: z.number()
  });

export const answerMonitoringSchema = z.object({
    observation: z.string().min(1),
    questions: z.array(z.any()),
    behavioral: z.array(z.object({
        idQuestion: z.number().min(1),
        question: z.string().min(1),
        note: z.number(),
        answer: z.boolean()
    })),
    file: z.instanceof(File).or(z.null()),
    clientCode: z.string().min(1),
    id_responsable: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export type answerMonitoringData = z.infer<typeof answerMonitoringSchema>

import { ICreditors } from "@/interfaces/generics/ICreditors";
import { z } from "zod";
import { IMonitoringResponse } from "../answer-monitoring/IAnswerMonitoringQuestions";
import { IOperator } from "@/interfaces/generics/IOperator";

interface ILooseMonitoringContainer {
    creditors: ICreditors[]
    operators: IOperator[]
}

interface ILooseMonitoringHeader {
    creditors: ICreditors[]
    operators: IOperator[]
    setValueQuestionList: (value: IMonitoringResponse, showQuestions: boolean) => void
    setValuesHeader: (id_creditor: number, id_ocorrence: number, id_aging: number) => void
    questions: IMonitoringResponse
}

interface ILooseMonitoringHeaderInfo {
    creditor: string
    ocorrence: string
    phase: string
}

interface ILooseMonitoringTable {
    questions: IMonitoringResponse
    operators: IOperator[]
    headerInfo: ILooseMonitoringHeaderInfo
}

interface ILooseHeaderConfigData {
    creditor: string
    ocorrence: string
    phase: string
}

export const ILooseHeaderConfigSchema = z.object({
    creditor: z.string().min(1).refine((value) => {
        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    ocorrence: z.string().min(1).refine((value) => {
        if (value == "disabled") {
            return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    }),
    phase: z.string().min(1).refine((value) => {
        if (value == "disabled") {
            return true
        }

        if (String(Number(value)) == "NaN") {
            return false
        }

        if (Number(value) <= 0) {
            return false
        }

        return true
    })
})

export const SubQuestions = z.object({
    idSubquestion: z.number(),
    subquestion: z.string(),
    answer: z.boolean(),
    note: z.number()
})

export const AnswerLooseMonitoringSchema = z.object({
    observation: z.string().min(1),
    questions: z.array(z.any()),
    behavioral: z.array(z.object({
        idQuestion: z.number().min(1),
        question: z.string().min(1),
        note: z.number(),
        answer: z.boolean()
    })),
    file: z.instanceof(File).or(z.null()).refine(value => {
        if (value == null) {
            return false
        }

        return true
    }),
    clientCode: z.string().min(1),
    operator: z.string().min(1)
})

export type AnswerLooseMonitoringData = z.infer<typeof AnswerLooseMonitoringSchema>
export type { ILooseMonitoringContainer, ILooseMonitoringHeader, ILooseMonitoringTable, ILooseHeaderConfigData, ILooseMonitoringHeaderInfo }
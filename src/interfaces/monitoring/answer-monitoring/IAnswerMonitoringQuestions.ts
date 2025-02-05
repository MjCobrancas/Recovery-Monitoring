interface IAnswerMonitoringQuestions {
    answer: boolean
    isBehavioral: boolean
    question: string
    subquestions: string
}

interface IAnswerMonitoringQuestionsBehavioral {
    answer: boolean
    isBehavioral: boolean
    question: string
}

interface IAnswerMonitoringQuestionsMonitoring {
    id_form: number
    negotiator_note: number
    behavioral_note: number
    observation: string
    monitoring_date: string
    negotiator_name: string
    negotiator_last_name: string
    Creditor: string
    Ocorrence: string
    Description: string
    evaluator_name: string
    evaluator_last_name: string
}

interface IMonitoringQuestions {
    question: string
    idQuestion: number
    position: number
    note: number
    isBehavioral: boolean
    is_critical_question: boolean
    subquestion: {
        idSubquestion: number
        subquestion: number
    }[] | []
}

interface IMonitoringBehavioral {
    question: string
    idQuestion: number
    position: number
    note: number
    isBehavioral: boolean
    is_critical_question: boolean
}

interface IMonitoringResponse {
    questions: IMonitoringQuestions[]
    behavioral: IMonitoringBehavioral[] 
}

interface IAnswerMonitoringQuestionsData {
    question: IAnswerMonitoringQuestions[]
    behavioral: IAnswerMonitoringQuestionsBehavioral[]
    monitoring: IAnswerMonitoringQuestionsMonitoring[]
}

export type { IMonitoringResponse, IAnswerMonitoringQuestions, IAnswerMonitoringQuestionsBehavioral, IAnswerMonitoringQuestionsMonitoring, IAnswerMonitoringQuestionsData, IMonitoringQuestions, IMonitoringBehavioral}
interface IDialogMonitoryUserProps {
    userMonitoryValues: IDialogMonitoryUser | null
    closeDialogMonitory: Function
    audio: any
    loadingAudio: boolean
}

interface IDialogMonitoryUser {
    behavioral: IMonitoryRealizerUserBehavioral[]
    monitoring: IMonitoryUserHeader[],
    questions: IMonitoryRealizerUserQuestions[]
}

interface IMonitoryRealizerUserBehavioral {
    answer: boolean
    isBehavioral: boolean
    question: string
    subquestions: null
}

interface IMonitoryRealizerUserQuestions {
    answer: boolean
    isBehavioral: boolean
    question: string
    subquestions: IMonitoryRealizerUserSubQuestions[] | null
}

interface IMonitoryRealizerUserSubQuestions {
    answer: boolean
    subquestion: string
}

interface IMonitoryUserHeader {
    Id_Creditor: number
    Creditor: string
    Creditor_Unique_Name: string | null
    Description: string
    Ocorrence: string
    behavioral_note: number
    evaluator_name: string
    evaluator_last_name: string
    id_form: number
    monitoring_date: string
    negotiator_name: string
    negotiator_last_name: string
    negotiator_note: number
    observation: string
    client_code: string
    is_loose_monitoring: boolean | null
}

export type { IDialogMonitoryUserProps, IDialogMonitoryUser }
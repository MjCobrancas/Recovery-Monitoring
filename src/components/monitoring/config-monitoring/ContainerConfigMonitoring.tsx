'use client'

import { IContainerMonitoringProps } from "@/interfaces/components/monitoring/config-monitoring/IContainerConfigMonitoring"
import { HeaderSelectConfig } from "./HeaderSelectConfig"
import { useState } from "react"
import { ConfigQuestions } from "./ConfigQuestions"
import { IQuestionsResponse } from "@/interfaces/components/monitoring/config-monitoring/IHeaderSelectConfig"

export function ContainerConfigMonitoring({ creditors }: IContainerMonitoringProps) {
    const [questionsList, setQuestionsList] = useState<IQuestionsResponse>({questions: [], behavioral: [], generic: []})
    const [showQuestionsConfig, setShowQuestionsConfig] = useState(false)


    function setValueQuestionList(value: IQuestionsResponse, showQuestions: boolean) {
        setQuestionsList(value)
        setShowQuestionsConfig(showQuestions)
    }

    return (
        <>
            <HeaderSelectConfig 
                creditors={creditors} 
                setValueQuestionList={setValueQuestionList}
            />

            {showQuestionsConfig && (
                <ConfigQuestions questionsList={questionsList} />
            )}
        </>
    )
}
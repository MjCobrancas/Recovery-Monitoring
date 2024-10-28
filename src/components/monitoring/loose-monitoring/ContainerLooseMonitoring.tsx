'use client'

import { ILooseMonitoringContainer } from "@/interfaces/monitoring/loose-monitoring/ILooseMonitoring";
import { HeaderLooseMonitoring } from "./HeaderLooseMonitoring";
import { useState } from "react";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions";

export function ContainerLooseMonitoring( { creditors, operators }: ILooseMonitoringContainer) {

    const [questionsList, setQuestionsList] = useState<IMonitoringResponse>({ questions: [], behavioral: [] })
    const [showQuestionsConfig, setShowQuestionsConfig] = useState(false)
    const [idCreditor, setIdCreditor] = useState(0)
    const [idOcorrence, setIdOcorrence] = useState(0)
    const [idAging, setIdAging] = useState(0)

    function setValuesHeader(id_creditor: number, id_ocorrence: number, id_aging: number) {
        setIdCreditor(id_creditor)
        setIdOcorrence(id_ocorrence)
        setIdAging(id_aging)
    }

    function setValueQuestionList(value: IMonitoringResponse, showQuestions: boolean) {
        setQuestionsList(value)
        setShowQuestionsConfig(showQuestions)
    }

    return (
        <>
            <HeaderLooseMonitoring 
                creditors={creditors}
                operators={operators}
                setValueQuestionList={setValueQuestionList}
                setValuesHeader={setValuesHeader}
                questions={questionsList}
            />
        </>
    )
}
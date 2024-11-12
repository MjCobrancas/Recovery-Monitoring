'use client'

import { ILooseMonitoringContainer } from "@/interfaces/monitoring/loose-monitoring/ILooseMonitoring";
import { HeaderLooseMonitoring } from "./HeaderLooseMonitoring";
import { useState } from "react";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions";

export function ContainerLooseMonitoring({ creditors, operators }: ILooseMonitoringContainer) {

    const [questionsList, setQuestionsList] = useState<IMonitoringResponse>({ questions: [], behavioral: [] })

    function setValueQuestionList(value: IMonitoringResponse) {
        setQuestionsList(value)
    }

    return (
        <>
            <HeaderLooseMonitoring 
                creditors={creditors}
                operators={operators}
                setValueQuestionList={setValueQuestionList}
                questions={questionsList}
            />
        </>
    )
}
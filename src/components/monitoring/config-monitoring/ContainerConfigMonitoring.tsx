'use client'

import { IContainerMonitoringProps } from "@/interfaces/monitoring/config-monitoring/IContainerConfigMonitoring"
import { HeaderSelectConfig } from "./HeaderSelectConfig"
import { useState } from "react"
import { ConfigQuestions } from "./ConfigQuestions"
import { IQuestionsResponse } from "@/interfaces/monitoring/config-monitoring/IHeaderSelectConfig"
import { Toaster } from "react-hot-toast"

export function ContainerConfigMonitoring({ creditors }: IContainerMonitoringProps) {
    const [questionsList, setQuestionsList] = useState<IQuestionsResponse>({ questions: [], behavioral: [], generic: [] })
    const [showQuestionsConfig, setShowQuestionsConfig] = useState(false)
    const [idCreditor, setIdCreditor] = useState(0)
    const [idOcorrence, setIdOcorrence] = useState(0)
    const [idAging, setIdAging] = useState(0)
    const [disableAllButtons, setDisableAllButtons] = useState(false)

    function setValueDisableAllButtons(value: boolean) {
        setDisableAllButtons(value)
    }

    function setValuesHeader(id_creditor: number, id_ocorrence: number, id_aging: number) {
        setIdCreditor(id_creditor)
        setIdOcorrence(id_ocorrence)
        setIdAging(id_aging)
    }

    function setValueQuestionList(value: IQuestionsResponse, showQuestions: boolean) {
        setQuestionsList(value)
        setShowQuestionsConfig(showQuestions)
    }

    function resetAllValues() {
        setValuesHeader(0, 0, 0)
        setQuestionsList({ questions: [], behavioral: [], generic: [] })
        setShowQuestionsConfig(false)
    }

    return (
        <>
            <HeaderSelectConfig
                creditors={creditors}
                setValueQuestionList={setValueQuestionList}
                setValuesHeader={setValuesHeader}
                setValueDisableAllButtons={setValueDisableAllButtons}
                disableAllButtons={disableAllButtons}
            />

            {showQuestionsConfig && (
                <ConfigQuestions
                    questionsList={questionsList}
                    idCreditor={idCreditor}
                    idOcorrence={idOcorrence}
                    idAging={idAging}
                    resetAllValues={resetAllValues}
                    setValueDisableAllButtons={setValueDisableAllButtons}
                    disableAllButtons={disableAllButtons}
                    creditors={creditors}
                />
            )}

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}
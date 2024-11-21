'use client'

import { IAnswerMonitoringContainer } from "@/interfaces/monitoring/answer-monitoring/IAnswerContainer";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions";
import { useState } from "react";
import { FormFindQuestions } from "./FormFindQuestions";
import { TableAnswerMonitoring } from "./TableAnswerMonitoring";
import { Toaster } from "react-hot-toast";

export function ContainerAnswerMonitoring({ config, idSchedule, schedule, creditorsUnique, isSpecialCreditor }: IAnswerMonitoringContainer) {

    const [questions, setQuestions] = useState<IMonitoringResponse | null>(null)
    const [idCreditorUnique, setIdCreditorUnique] = useState(0)
    const [idAging, setIdAging] = useState(0)

    function setQuestionsValue(data: IMonitoringResponse | null) {
        setQuestions(data)
    }

    function setValueIdCreditorUnique(id_creditor_unique: number) {
        setIdCreditorUnique(id_creditor_unique)
    }

    function setValueIdAging(id_aging: number) {
        setIdAging(id_aging)
    }

    return (
        <>
            {schedule.map((item, i) => {
                return (
                    <div key={i} className={`flex flex-col justify-center items-center font-bold text-slate-500 dark:text-slate-200 gap-2 mb-2`}>
                        <p>{item.Name + " " + item.Last_Name} ({item.UserName})</p>

                        <p>{item.Creditor} | {item.Ocorrence} | {item.Description}</p>
                    </div>
                )
            })}

            <FormFindQuestions 
                config={config} 
                schedule={schedule} 
                creditorsUnique={creditorsUnique}
                setQuestionsValue={setQuestionsValue}
                setValueIdCreditorUnique={setValueIdCreditorUnique}
                isSpecialCreditor={isSpecialCreditor}
                setValueIdAging={setValueIdAging}
            />

            {questions != null && (
                <TableAnswerMonitoring 
                    questions={questions}
                    config={config}
                    idSchedule={idSchedule}
                    idCreditorUnique={idCreditorUnique}
                    idAging={idAging}
                    isSpecialCreditor={isSpecialCreditor}
                />
            )}
            
            <Toaster
                reverseOrder={false}
                position="bottom-right"
            />
        </>
    )
}

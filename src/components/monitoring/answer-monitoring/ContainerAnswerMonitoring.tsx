'use client'

import { IAnswerMonitoringContainer } from "@/interfaces/monitoring/answer-monitoring/IAnswerContainer";
import { TableAnswerMonitoring } from "./TableAnswerMonitoring";
import { FormFindQuestions } from "./FormFindQuestions";
import { useState } from "react";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions";

export function ContainerAnswerMonitoring({ config, idSchedule, schedule, creditorsUnique }: IAnswerMonitoringContainer) {

    const [questions, setQuestions] = useState<IMonitoringResponse | null>(null)
    const [idCreditorUnique, setIdCreditorUnique] = useState(0)

    function setQuestionsValue(data: IMonitoringResponse | null) {
        setQuestions(data)
    }

    function setValueIdCreditorUnique(id_creditor_unique: number) {
        setIdCreditorUnique(id_creditor_unique)
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
            />

            {questions != null && (
                <TableAnswerMonitoring 
                    questions={questions}
                    config={config}
                    idSchedule={idSchedule}
                    idCreditorUnique={idCreditorUnique}
                />
            )}
            
        </>
    )
}

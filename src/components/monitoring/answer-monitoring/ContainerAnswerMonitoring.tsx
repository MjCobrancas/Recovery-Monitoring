import { IAnswerMonitoringContainer } from "@/interfaces/monitoring/answer-monitoring/IAnswerContainer";
import { TableAnswerMonitoring } from "./TableAnswerMonitoring";

export function ContainerAnswerMonitoring({ questions, backOffices, config, idSchedule }: IAnswerMonitoringContainer) {

    return (
        <>
            <TableAnswerMonitoring 
                questions={questions}
                backOffices={backOffices}
                config={config}
                idSchedule={idSchedule}
            />
        </>
    )
}
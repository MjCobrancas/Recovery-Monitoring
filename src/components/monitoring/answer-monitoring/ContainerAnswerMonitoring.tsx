import { IAnswerMonitoringContainer } from "@/interfaces/monitoring/answer-monitoring/IAnswerContainer";
import { TableAnswerMonitoring } from "./TableAnswerMonitoring";

export function ContainerAnswerMonitoring({ questions, config, idSchedule, schedule }: IAnswerMonitoringContainer) {

    return (
        <>
            <TableAnswerMonitoring 
                questions={questions}
                config={config}
                idSchedule={idSchedule}
                schedule={schedule}
            />
        </>
    )
}
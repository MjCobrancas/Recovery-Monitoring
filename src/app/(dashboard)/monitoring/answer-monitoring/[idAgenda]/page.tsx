import { getMonitoringQuestions } from "@/api/monitoring/answer-monitoring/getMonitoringQuestions";
import { getQuantityById } from "@/api/monitoring/answer-monitoring/getQuantityById";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IScheduleAnswerId } from "@/interfaces/monitoring/answer-monitoring/IAnswerScheduleId";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions"
import { ContainerAnswerMonitoring } from "@/components/monitoring/answer-monitoring/ContainerAnswerMonitoring";

export default async function Home({params}: {params: {idAgenda: string}}) {

    const scheduleId: IScheduleAnswerId[] = await getQuantityById(params.idAgenda)
    const monitoringQuestions: IMonitoringResponse = await getMonitoringQuestions(scheduleId)

    return (
        <PaperBlock>
            <TextPrincipal 
                text={`Monitoria ${params.idAgenda ? params.idAgenda : ""}`}
                styles={`max-md:text-[2rem]`}
            />

            <ContainerAnswerMonitoring 
                questions={monitoringQuestions}
                config={scheduleId}
                idSchedule={Number(params.idAgenda)}
            />
        </PaperBlock>
    )
}
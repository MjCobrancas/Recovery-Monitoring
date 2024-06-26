import { getMonitoringQuestions } from "@/api/monitoring/answer-monitoring/getMonitoringQuestions";
import { getQuantityById } from "@/api/monitoring/answer-monitoring/getQuantityById";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IScheduleAnswerId } from "@/interfaces/monitoring/answer-monitoring/IAnswerScheduleId";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions"
import { ContainerAnswerMonitoring } from "@/components/monitoring/answer-monitoring/ContainerAnswerMonitoring";
import { IBackOffice } from "@/interfaces/generics/IBackOffice";
import { getAllBackOffices } from "@/api/generics/getAllBackOffices";

export default async function Home({params}: {params: {idAgenda: string}}) {

    const scheduleId: IScheduleAnswerId[] = await getQuantityById(params.idAgenda)
    const monitoringQuestions: IMonitoringResponse = await getMonitoringQuestions(scheduleId)
    const backOffices: IBackOffice[] = await getAllBackOffices()

    return (
        <PaperBlock>
            <TextPrincipal 
                text={`Monitoria ${params.idAgenda ? params.idAgenda : ""}`}
                styles={`max-md:text-[2rem]`}
            />

            <ContainerAnswerMonitoring 
                questions={monitoringQuestions}
                backOffices={backOffices}
                config={scheduleId}
                idSchedule={Number(params.idAgenda)}
            />
        </PaperBlock>
    )
}
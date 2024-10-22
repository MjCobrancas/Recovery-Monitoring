import { getMonitoringQuestions } from "@/api/monitoring/answer-monitoring/getMonitoringQuestions";
import { getQuantityById } from "@/api/monitoring/answer-monitoring/getQuantityById";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { IScheduleAnswerId } from "@/interfaces/monitoring/answer-monitoring/IAnswerScheduleId";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions"
import { ContainerAnswerMonitoring } from "@/components/monitoring/answer-monitoring/ContainerAnswerMonitoring";
import { IScheduleUser } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { getUserByScheduleId } from "@/api/monitoring/answer-monitoring/getUserByScheduleId";

export default async function Home({params}: {params: {idAgenda: string}}) {

    const scheduleId: IScheduleAnswerId[] = await getQuantityById(params.idAgenda)
    const monitoringQuestions: IMonitoringResponse = await getMonitoringQuestions(scheduleId)
    const schedule: IScheduleUser[] = await getUserByScheduleId(params.idAgenda)

    return (
        <PaperBlock>
            <TextPrincipal 
                text={`Monitoria ${params.idAgenda ? params.idAgenda : ""}`}
                styles={`max-md:text-[2rem] mb-4`}
            />

            <ContainerAnswerMonitoring 
                questions={monitoringQuestions}
                config={scheduleId}
                idSchedule={Number(params.idAgenda)}
                schedule={schedule}
            />
        </PaperBlock>
    )
}
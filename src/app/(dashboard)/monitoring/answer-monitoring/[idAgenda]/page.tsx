import { getVerifyIsSpecialCreditor } from "@/api/generics/getVerifyIsSpecialCreditor";
import { getQuantityById } from "@/api/monitoring/answer-monitoring/getQuantityById";
import { getUserByScheduleId } from "@/api/monitoring/answer-monitoring/getUserByScheduleId";
import { getCreditorRelationWithCreditorUnique } from "@/api/monitoring/config-monitoring/getCreditorRelationWithCreditorUnique";
import { Ancora } from "@/components/Ancora";
import { ContainerAnswerMonitoring } from "@/components/monitoring/answer-monitoring/ContainerAnswerMonitoring";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IScheduleAnswerId } from "@/interfaces/monitoring/answer-monitoring/IAnswerScheduleId";
import { IScheduleUser } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";

export default async function Home({ params }: { params: { idAgenda: string } }) {

    const scheduleId: IScheduleAnswerId[] = await getQuantityById(params.idAgenda)
    const schedule: IScheduleUser[] = await getUserByScheduleId(params.idAgenda)
    const responseCreditorRelation = await getCreditorRelationWithCreditorUnique(scheduleId[0].Id_Creditor)
    const creditorsUnique: ICreditorsUnique[] = responseCreditorRelation.data
    const isSpecialCreditor = await getVerifyIsSpecialCreditor(scheduleId[0].Id_Creditor)

    return (
        <PaperBlock styles="relative">
            <TextPrincipal 
                text={`Monitoria ${params.idAgenda ? params.idAgenda : ""}`}
                styles={`max-md:text-[2rem] mb-4`}
            />

            <ContainerAnswerMonitoring 
                config={scheduleId}
                idSchedule={Number(params.idAgenda)}
                schedule={schedule}
                creditorsUnique={creditorsUnique}
                isSpecialCreditor={isSpecialCreditor}
            />

            <Ancora
                title="Voltar"
                toGo="/monitoring/schedule-monitoring"
                styles={`absolute left-1 bottom-1 ml-1 mb-1 w-16`}
            />
        </PaperBlock>
    )
}
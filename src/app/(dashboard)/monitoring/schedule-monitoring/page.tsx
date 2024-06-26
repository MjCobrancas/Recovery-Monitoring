import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOcorrences } from "@/api/generics/getAllOcorrences";
import { getAllSchedule } from "@/api/monitoring/schedule-monitoring/getAllSchedule";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerSchedule } from "@/components/monitoring/schedule-monitoring/ContainerSchedule";
import { IFilterScheduleOcorrences } from "@/interfaces/monitoring/schedule-monitoring/IFilterSchedule";
import { ISchedules } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { ICreditors } from "@/interfaces/generics/ICreditors";

export default async function Home() {

    const schedules: ISchedules = await getAllSchedule()
    const creditors: ICreditors[] = await getAllCreditors()
    const ocorrences: IFilterScheduleOcorrences = await getAllOcorrences()

    return (
        <PaperBlock styles={``}>
            <TextPrincipal text="Agendas" styles={`max-md:text-[2rem]`} />

            <ContainerSchedule 
                schedules={schedules.agendas}
                creditors={creditors}
                ocorrences={ocorrences}
            />
        </PaperBlock>
    )
}
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOcorrences } from "@/api/generics/getAllOcorrences";
import { getAllSchedule } from "@/api/monitoring/schedule-monitoring/getAllSchedule";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerSchedule } from "@/components/monitoring/schedule-monitoring/ContainerSchedule";
import { IFilterScheduleOcorrences } from "@/interfaces/monitoring/schedule-monitoring/IFilterSchedule";
import { ISchedules } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { ICreditors } from "@/interfaces/generics/ICreditors";
import { Ancora } from "@/components/Ancora";

export default async function Home() {

    const schedules: ISchedules = await getAllSchedule()
    const creditors: ICreditors[] = await getAllCreditors()
    const ocorrences: IFilterScheduleOcorrences = await getAllOcorrences()

    return (
        <PaperBlock styles={``}>
            <TextPrincipal text="Agendas" styles={`max-md:text-[2rem]`} />

            <div className="absolute top-20 right-10 max-md:top-[65px]">
                <Ancora
                    title="Monitoria Avulsa"
                    toGo={"/monitoring/loose-monitoring"}
                    styles={`border border-blue-500 rounded-md bg-transparent
                        duration-200 px-2 py-2 text-blue-500 hover:bg-blue-500 dark:bg-transparent
                        dark:hover:bg-blue-500
                        w-[150px] h-[43px] text-md`}
                />
            </div>

            <ContainerSchedule 
                schedules={schedules.agendas}
                creditors={creditors}
                ocorrences={ocorrences}
            />
        </PaperBlock>
    )
}
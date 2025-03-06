import { getAllBackOffices } from "@/api/generics/getAllBackOffices";
import { getAllCreditorsUnique } from "@/api/generics/getAllCreditorsUnique";
import { getAllOcorrences } from "@/api/generics/getAllOcorrences";
import { getAllSupervisors } from "@/api/generics/getAllSupervisors";
import { getBackOffice } from "@/api/generics/getBackOfficeById";
import { getMonitoringUsers } from "@/api/monitoring/realized/getMonitoringUsers";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerMonitoryRealized } from "@/components/monitoring/realized/ContainerMonitoryRealized";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IBackOffice } from "@/interfaces/generics/IBackOffice";
import { IBackOffices } from "@/interfaces/generics/IBackOffices";
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences";
import { ISupervisors } from "@/interfaces/generics/ISupervisors";
import { IMonitoryAllUsers } from "@/interfaces/monitoring/realized/IContainerMonitoryRealized";

export default async function Page() {

    const monitoryUsers: IResultDefaultResponse<IMonitoryAllUsers[]> = await getMonitoringUsers()
    const creditorsUnique: ICreditorsUnique[] = await getAllCreditorsUnique()
    const ocorrences: IGetAllOcorrences = await getAllOcorrences()
    const backOffices: IBackOffices[] = await getBackOffice()
    const avaliators: IBackOffice[] = await getAllBackOffices()
    const supervisors: ISupervisors[] = await getAllSupervisors()

    return (
        <PaperBlock>
            <TextPrincipal text="Monitorias Realizadas" />

            <ContainerMonitoryRealized 
                monitoryUsers={monitoryUsers.status ? monitoryUsers.data : []} 
                creditorsUnique={creditorsUnique}
                ocorrences={ocorrences}
                backOffices={backOffices}
                avaliators={avaliators}
                supervisors={supervisors}
            />
        </PaperBlock>
    )

}

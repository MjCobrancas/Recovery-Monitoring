import { getAllBackOffice } from "@/api/generics/getAllBackOffice";
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllOcorrences } from "@/api/generics/getAllOcorrences";
import { getAllMonitoringUser } from "@/api/monitoring/realized/getAllMonitoringUser";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerMonitoryRealized } from "@/components/monitoring/realized/ContainerMonitoryRealized";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IBackOffices } from "@/interfaces/generics/IBackOffices";
import { IGetAllOcorrences } from "@/interfaces/generics/IOcorrences";
import { IMonitoryAllUsers } from "@/interfaces/monitoring/realized/IContainerMonitoryRealized";
import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors";

export default async function Page() {

    const monitoryUsers: IResultDefaultResponse<IMonitoryAllUsers[]> = await getAllMonitoringUser()
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()
    const ocorrences: IGetAllOcorrences = await getAllOcorrences()
    const backOffices: IResultDefaultResponse<IBackOffices[] | null> = await getAllBackOffice()

    return (
        <PaperBlock>
            <TextPrincipal text="Monitorias realizadas" />

            <ContainerMonitoryRealized 
                monitoryUsers={monitoryUsers.status ? monitoryUsers.data : []} 
                creditors={creditors}
                ocorrences={ocorrences}
                backOffices={backOffices.status ? backOffices.data! : []}
            />
        </PaperBlock>
    )

}
import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { Ancora } from "@/components/Ancora";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ContainerConfigMonitoring } from "@/components/monitoring/config-monitoring/ContainerConfigMonitoring";
import { ICreditorGetAllCreditors } from "@/interfaces/register/creditor/GetAllCreditors";

export default async function page() {
    const creditors: ICreditorGetAllCreditors[] = await getAllCreditors()

    return (
        <PaperBlock styles="relative">
            <TextPrincipal text="Prepare a monitoria" />

            <ContainerConfigMonitoring creditors={creditors} />

            <Ancora title="Voltar" toGo={`${process.env.MANAGEMENT_DOMAIN}/register`} styles="absolute left-1 bottom-1 ml-1 mb-1 w-16" />
        </PaperBlock>
    )
}
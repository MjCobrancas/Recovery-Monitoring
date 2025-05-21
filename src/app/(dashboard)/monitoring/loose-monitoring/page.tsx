import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllInactiveOperators } from "@/api/generics/getAllInactiveOperators";
import { getAllUsers } from "@/api/generics/getAllUsers";
import { Ancora } from "@/components/Ancora";
import { ContainerLooseMonitoring } from "@/components/monitoring/loose-monitoring/ContainerLooseMonitoring";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditors } from "@/interfaces/generics/ICreditors";
import { IOperator } from "@/interfaces/generics/IOperator";

export default async function Home() {

    const creditors: ICreditors[] = await getAllCreditors()
    const operators: IOperator[] = await getAllUsers()

    return (
        <PaperBlock styles={`relative`}>
            <TextPrincipal text="Monitoria Avulsa" />

            <ContainerLooseMonitoring 
                creditors={creditors}
                operators={operators}
            />

            <Ancora 
                title="Voltar"
                toGo="/monitoring/schedule-monitoring"
                styles="absolute left-1 bottom-1 w-fit mx-1 mb-1"
            />
        </PaperBlock>        
    )
}

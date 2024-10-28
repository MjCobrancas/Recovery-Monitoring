import { getAllCreditors } from "@/api/generics/getAllCreditors";
import { getAllInactiveOperators } from "@/api/generics/getAllInactiveOperators";
import { ContainerLooseMonitoring } from "@/components/monitoring/loose-monitoring/ContainerLooseMonitoring";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditors } from "@/interfaces/generics/ICreditors";
import { IOperator } from "@/interfaces/generics/IOperator";

export default async function Home() {

    const creditors: ICreditors[] = await getAllCreditors()
    const operators: IOperator[] = await getAllInactiveOperators()

    return (
        <PaperBlock styles={``}>
            <TextPrincipal text="Monitoria Avulsa" />

            <ContainerLooseMonitoring 
                creditors={creditors}
                operators={operators}
            />
        </PaperBlock>        
    )
}

import { getAllCreditorsUnique } from "@/api/generics/getAllCreditorsUnique";
import { getAllOperators } from "@/api/generics/getAllOperators";
import { getMonitoringGraphics } from "@/api/monitoring/graphics/getMonitoringGraphics";
import { ContainerMonitoringGraphics } from "@/components/monitoring/graphics/ContainerMonitoringGraphics";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const graphics = await getMonitoringGraphics()
    const creditorsUniqueList: ICreditorsUnique[] = await getAllCreditorsUnique()
    const operators = await getAllOperators()

    return (
        <PaperBlock>
            <TextPrincipal text="Gráficos das monitorias" />

            {graphics.data == null ? (
                <p>Não foi possível encontrar os gráficos</p>
            ): (
                <ContainerMonitoringGraphics 
                    graphics={graphics.data!} 
                    creditorsUniqueList={creditorsUniqueList}    
                    operators={operators}
                />
            )}

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </PaperBlock>
    )

}

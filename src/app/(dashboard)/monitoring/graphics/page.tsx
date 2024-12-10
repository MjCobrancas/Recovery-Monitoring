import { getAllCreditorsUnique } from "@/api/generics/getAllCreditorsUnique";
import { getMonitoringGraphics } from "@/api/monitoring/graphics/getMonitoringGraphics";
import { ContainerMonitoringGraphics } from "@/components/monitoring/graphics/ContainerMonitoringGraphics";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const graphics = await getMonitoringGraphics()
    const creditorsUniqueList: ICreditorsUnique[] = await getAllCreditorsUnique()

    return (
        <PaperBlock>
            <TextPrincipal text="Gráfico das monitorias" />

            {graphics.data == null ? (
                <p>Não foi possível encontrar os gráficos</p>
            ): (
                <ContainerMonitoringGraphics 
                    graphics={graphics.data!} 
                    creditorsUniqueList={creditorsUniqueList}    
                />
            )}

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </PaperBlock>
    )

}

import { getAllUsers } from "@/api/generics/getAllUsers";
import { ContainerCreateFeedback } from "@/components/monitoring/create-feedback/ContainerCreateFeedback";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const operators = await getAllUsers(true)

    return (
        <PaperBlock styles="min-h-[100vh]">
            <TextPrincipal text="Criar feedback para o operador" />

            <ContainerCreateFeedback operators={operators} />

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </PaperBlock>
    )

}

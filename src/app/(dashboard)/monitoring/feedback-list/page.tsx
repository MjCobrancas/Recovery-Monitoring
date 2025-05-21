import { getAllUsers } from "@/api/generics/getAllUsers";
import { getMonitoringFeedbacks } from "@/api/monitoring/feedback/getMonitoringFeedbacks";
import { getResponsablesOnMonitoringFeedbacks } from "@/api/monitoring/feedback/getResponsablesOnMonitoringFeedbacks";
import { ContainerFeedbackList } from "@/components/monitoring/feedback-list/ContainerFeedbackList";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import { getDateToday } from "@/utils/DateToday";
import { Toaster } from "react-hot-toast";

export default async function Page() {

    const feedbacks = await getMonitoringFeedbacks(getDateToday(), getDateToday())
    const responsables = await getResponsablesOnMonitoringFeedbacks()
    const operators = await getAllUsers(true)

    return (
        <PaperBlock styles="min-h-[100vh]">
            <TextPrincipal text="Lista de feedbacks aplicados" />

            <ContainerFeedbackList 
                feedbacks={feedbacks} 
                responsables={responsables}
                operators={operators}
            />

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </PaperBlock>
    )

}

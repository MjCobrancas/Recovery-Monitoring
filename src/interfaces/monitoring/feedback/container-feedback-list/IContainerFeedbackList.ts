import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";
import { IGetMonitoringFeedbacks } from "../IGetMonitoringFeedback";

interface IContainerFeedbackListProps {
    feedbacks: IGetMonitoringFeedbacks[]
    responsables: Omit<IGetAllOperators, "Status">[]
    operators: IGetAllOperators[]
}

export type { IContainerFeedbackListProps }

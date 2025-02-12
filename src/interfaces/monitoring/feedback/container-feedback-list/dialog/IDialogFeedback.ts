import { RefObject } from "react";
import { IGetMonitoringFeedbacks } from "../../IGetMonitoringFeedback";

interface IDialogFeedbackProps {
    feedbacks: IGetMonitoringFeedbacks[]
    feedbackIndex: number
    dialogRef: RefObject<HTMLDialogElement>
}

export type { IDialogFeedbackProps }

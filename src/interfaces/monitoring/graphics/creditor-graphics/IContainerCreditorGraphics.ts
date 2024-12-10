import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IMonitoringGraphicsResponse } from "../IMonitoringGraphics";

interface IContainerCreditorGraphicsProps {
    creditorsUniqueList: ICreditorsUnique[]
    graphics: IMonitoringGraphicsResponse
}

export type { IContainerCreditorGraphicsProps }

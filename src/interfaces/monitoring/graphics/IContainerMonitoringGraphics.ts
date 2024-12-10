import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IMonitoringGraphicsResponse } from "./IMonitoringGraphics";

interface IContainerMonitoringGraphicsProps {
    graphics: IMonitoringGraphicsResponse
    creditorsUniqueList: ICreditorsUnique[]
}

export type { IContainerMonitoringGraphicsProps }

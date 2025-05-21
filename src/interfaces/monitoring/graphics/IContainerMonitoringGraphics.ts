import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique";
import { IMonitoringGraphicsResponse } from "./IMonitoringGraphics";
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators";

interface IContainerMonitoringGraphicsProps {
    graphics: IMonitoringGraphicsResponse
    creditorsUniqueList: ICreditorsUnique[]
    operators: IGetAllOperators[]
}

export type { IContainerMonitoringGraphicsProps }

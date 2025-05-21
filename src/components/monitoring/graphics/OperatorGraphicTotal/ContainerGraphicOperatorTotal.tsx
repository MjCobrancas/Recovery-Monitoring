import { IContainerGraphicOperatorProps } from "@/interfaces/monitoring/graphics/operator-graphic/IContainerGraphicOperatorTotal";
import { IGetOperatorGraphic } from "@/interfaces/monitoring/graphics/operator-graphic/IGetOperatorGraphic";
import { useState } from "react";
import { OperatorGraphicTotal } from "./OperatorGraphicTotal";
import { FilterOperatorGraphicTotal } from "./FilterOperatorGraphicTotal";

export function ContainerGraphicOperatorTotal({ operators }: IContainerGraphicOperatorProps) {

    const [operatorGraphic, setOperatorGraphic] = useState<IGetOperatorGraphic[]>([])

    return (
        <>
            <FilterOperatorGraphicTotal 
                operators={operators}
                operatorGraphic={operatorGraphic}
                setOperatorGraphic={setOperatorGraphic}
            />
            
            {operatorGraphic.length > 0 && (
                <OperatorGraphicTotal 
                    graphics={operatorGraphic}
                />
            )}
        </>
    )

}
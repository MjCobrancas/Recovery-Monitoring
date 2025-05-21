'use client'

import { IContainerMonitoringGraphicsProps } from "@/interfaces/monitoring/graphics/IContainerMonitoringGraphics";
import { useState } from "react";
import { ContainerCreditorGraphics } from "./CreditorGraphics/ContainerCreditorGraphics";
import { ContainerGraphicsOperators } from "./OperatorGraphics/ContainerGraphicsOperators";
import { SelectGraphics } from "./SelectGraphics/SelectGraphics";
import { ContainerGraphicsSupervisor } from "./SupervisorGraphics/ContainerGraphicsSupervisor";
import { ContainerGraphicOperatorTotal } from "./OperatorGraphicTotal/ContainerGraphicOperatorTotal";

export function ContainerMonitoringGraphics({ graphics, creditorsUniqueList, operators }: IContainerMonitoringGraphicsProps) {

    const [graphicType, setGraphicType] = useState("graphic-creditor")

    function setValueGraphicType(type: string) {
        setGraphicType(type)
    }

    return (
        <>
            <SelectGraphics
                graphicType={graphicType}
                setValueGraphicType={setValueGraphicType}
            />

            {graphicType == "graphic-creditor" && (
                <ContainerCreditorGraphics
                    creditorsUniqueList={creditorsUniqueList}
                    graphics={graphics}
                />
            )}

            {graphicType == "graphic-operators" && (
                <ContainerGraphicsOperators 
                    creditorsUniqueList={creditorsUniqueList}
                />
            )}

            {graphicType == "graphic-operator-total" && (
                <ContainerGraphicOperatorTotal 
                    operators={operators}
                />
            )}

            {graphicType == "graphic-supervisors" && (
                <ContainerGraphicsSupervisor />
            )}
        </>
    )

}

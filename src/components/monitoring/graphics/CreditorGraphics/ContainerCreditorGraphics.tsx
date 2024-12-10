import { IContainerCreditorGraphicsProps } from "@/interfaces/monitoring/graphics/creditor-graphics/IContainerCreditorGraphics"
import { IMonitoringGraphicsResponse } from "@/interfaces/monitoring/graphics/IMonitoringGraphics"
import { useState } from "react"
import { CreditorGraphics } from "./CreditorGraphics"
import { FilterCreditorGraphics } from "./FilterCreditorGraphics"

export function ContainerCreditorGraphics({ creditorsUniqueList, graphics }: IContainerCreditorGraphicsProps) {

    const [graphicsList, setGraphicsList] = useState<IMonitoringGraphicsResponse>(graphics)
    const [count, setCount] = useState(0)

    function setValueGraphicsList(graphicsObject: IMonitoringGraphicsResponse) {
        setGraphicsList(graphicsObject)
        setCount(0)
    }

    function setValueCount(index: number) {
        setCount(index)
    }

    function graphicsDefaultValue() {
        setValueGraphicsList(graphics)
        setCount(0)
    }

    return (
        <>
            <FilterCreditorGraphics
                creditorsUniqueList={creditorsUniqueList}
                setValueGraphicsList={setValueGraphicsList}
                graphicsDefaultValue={graphicsDefaultValue}
            />
            <CreditorGraphics
                graphics={graphicsList}
                count={count}
                setCount={setValueCount}
            />
        </>

    )

}

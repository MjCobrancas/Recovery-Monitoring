import { IContainerGraphicsOperatorsProps } from "@/interfaces/monitoring/graphics/operators-graphics/IContainerGraphicsOperators";
import { FilterOperatorGraphics } from "./FilterOperatorGraphics";
import { useState } from "react";
import { IOperatorGraphicsResponse } from "@/interfaces/monitoring/graphics/operators-graphics/IOperatorGraphics";
import { OperatorsGraphics } from "./OperatorsGraphics";

export function ContainerGraphicsOperators({ creditorsUniqueList }: IContainerGraphicsOperatorsProps) {

    const [graphicsOperators, setGraphicsOperators] = useState<IOperatorGraphicsResponse | null>(null)
    const [countOcorrence, setCountOcorrence] = useState(0)
    const [countAging, setCountAging] = useState(0)

    function handleSetCount(indexOcorrence: number, indexAging: number) {
        setCountOcorrence(indexOcorrence)
        setCountAging(indexAging)
    }

    function setValueGraphicsOperators(graphics: IOperatorGraphicsResponse | null) {
        setGraphicsOperators(graphics)
    }

    return (
        <>
            <FilterOperatorGraphics 
                creditorsUniqueList={creditorsUniqueList}
                graphicsOperators={graphicsOperators}
                setValueGraphicsOperators={setValueGraphicsOperators}
                handleSetCount={handleSetCount}
            />
            <OperatorsGraphics 
                graphics={graphicsOperators}
                countOcorrence={countOcorrence}
                countAging={countAging}
                handleSetCount={handleSetCount}
            />
        </>
    )

}

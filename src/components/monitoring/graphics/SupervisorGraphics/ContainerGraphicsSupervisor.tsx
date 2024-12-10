import { useState } from "react";
import { FilterGraphicsSupervisor } from "./FilterGraphicsSupervisor";
import { IMonitoringGraphicsChartConfig, IMonitoringGraphicsSupervisor } from "@/interfaces/monitoring/graphics/supervisor-graphics/IContainerGraphicsSupervisor";
import { SupervisorGraphics } from "./SupervisorGraphics";

export function ContainerGraphicsSupervisor() {

    const [graphicsSupervisor, setGraphicsSupervisor] = useState<IMonitoringGraphicsSupervisor | null>(null)
    const [countCreditor, setCountCreditor] = useState(0)
    const [graphicsChartConfig, setGraphicsChartConfig] = useState<IMonitoringGraphicsChartConfig | null>(null)

    function setValueGraphicsChartConfig(chartConfig: IMonitoringGraphicsChartConfig | null) {
        setGraphicsChartConfig(chartConfig)
    }

    function setValueGraphicsSupervisor(graphicsSupervisor: IMonitoringGraphicsSupervisor | null) {
        setGraphicsSupervisor(graphicsSupervisor)
    }

    function setValueCountCreditor(value: number) {
        setCountCreditor(value)
    }

    return (
        <>
            <FilterGraphicsSupervisor 
                graphicsSupervisorData={graphicsSupervisor}
                setValueGraphicsSupervisor={setValueGraphicsSupervisor}
                setValueGraphicsChartConfig={setValueGraphicsChartConfig}
                setValueCountCreditor={setValueCountCreditor}
            />
            <SupervisorGraphics 
                graphicsSupervisor={graphicsSupervisor} 
                countCreditor={countCreditor}
                setValueCountCreditor={setValueCountCreditor}
                graphicsChartConfig={graphicsChartConfig}
            />
        </>
    )

}

'use client'

import { IScheduleDataContainer, ISchedulesData, ISchedulesResponse } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { HeaderSchedule } from "./HeaderSchedule";
import { TableSchedule } from "./TableSchedule";
import { FilterSchedule } from "./FilterSchedule";
import { useState } from "react";

export function ContainerSchedule({ schedules, creditors, ocorrences }: IScheduleDataContainer) {

    const [isFiltred, setIsFiltred] = useState<ISchedulesResponse[]>([])

    function setValueFilter(value: ISchedulesResponse[]) {
        setIsFiltred(value)
    }

    return (
        <>
            <HeaderSchedule
                schedules={schedules}
            />

            <FilterSchedule
                creditors={creditors}
                ocorrences={ocorrences}
                setFilter={setValueFilter}

            />

            <TableSchedule
                schedules={schedules}
                filter={isFiltred}
            />
        </>
    )
}
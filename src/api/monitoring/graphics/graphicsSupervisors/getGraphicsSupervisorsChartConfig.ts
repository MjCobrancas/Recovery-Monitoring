'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IMonitoringGraphicsChartConfig } from "@/interfaces/monitoring/graphics/supervisor-graphics/IContainerGraphicsSupervisor"
import { IGetGraphicsSupervisors } from "@/interfaces/monitoring/graphics/supervisor-graphics/IGetGraphicsSupervisors"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getMonitoringGraphicsSupervisorsChartConfig(id_backoffice: number[]) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-supervisors-chart-config`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_backoffice })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: null
                }
            }

            return {
                data: data.data as IMonitoringGraphicsChartConfig
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}

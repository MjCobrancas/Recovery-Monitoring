'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IMonitoringGraphicsResponse } from "@/interfaces/monitoring/graphics/IMonitoringGraphics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getMonitoringGraphics(id_creditor_unique: number = 0, date_init: string = "", date_end: string = "") {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-creditors`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_creditor_unique, date_init, date_end })
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return {
                    data: null
                }
            }

            return {
                data: data.data as IMonitoringGraphicsResponse
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}
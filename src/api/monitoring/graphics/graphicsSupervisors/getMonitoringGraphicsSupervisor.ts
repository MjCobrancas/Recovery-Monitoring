'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getMonitoringGraphicsSupervisor(id_backoffice: number[], date_init: string, date_end: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-supervisor`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_backoffice, date_init, date_end })
    })
        .then(async (value) => {
            const data = await value.json()
            
            if (data.errors.length > 0) {
                return {
                    data: null
                }
            }

            return {
                data: data.data
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}

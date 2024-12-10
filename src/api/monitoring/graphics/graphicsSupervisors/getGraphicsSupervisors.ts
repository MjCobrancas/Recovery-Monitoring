'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetGraphicsSupervisors } from "@/interfaces/monitoring/graphics/supervisor-graphics/IGetGraphicsSupervisors"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getGraphicsSupervisors(date_init: string, date_end: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-supervisors-id`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ date_init, date_end })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: null
                }
            }

            return {
                data: data.data as IGetGraphicsSupervisors[]
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}

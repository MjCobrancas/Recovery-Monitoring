'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetMonitoringFeedbacks } from "@/interfaces/monitoring/feedback/IGetMonitoringFeedback"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getMonitoringFeedbacks(date_init: string, date_end: string, id_operator: number = 0, id_responsable: number = 0) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-feedbacks`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({
            id_operator,
            id_responsable,
            date_init,
            date_end
        }),
        cache: 'no-store',
        next: {
            tags: ['get-monitoring-feedbacks']
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return []
            }

            return data.data as IGetMonitoringFeedbacks[]
        })
        .catch((error) => {
            return []
        })

    return resp
}
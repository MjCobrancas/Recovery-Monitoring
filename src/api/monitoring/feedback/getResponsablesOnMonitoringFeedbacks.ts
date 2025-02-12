'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getResponsablesOnMonitoringFeedbacks() {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-responsables-on-monitoring-feedbacks`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: ['get-responsables-on-monitoring-feedbacks']
        }
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return []
            }

            return data.data as Omit<IGetAllOperators, 'Status'>[]
        })
        .catch((error) => {
            return []
        })

    return resp
}

'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IMonitoryAllUsers } from "@/interfaces/monitoring/realized/IContainerMonitoryRealized"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllMonitoringUser() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-monitoring-users`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        cache: "no-cache",
        next: {
            tags: ["getAllMonitoringRealizedUsers"]
        }
    })
        .then(async (value) => {
            const data = await value.json()
            
            if (value.status == 400) {
                return {
                    data: [],
                    status: false
                }
            }

            return {
                data: data.data as IMonitoryAllUsers[],
                status: true
            }
        })
        .catch((error) => {
            return {
                data: [],
                status: false
            }
        })

    return resp
}
'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IMonitoryAllUsers } from "@/interfaces/monitoring/realized/IContainerMonitoryRealized"
import { getDateToday } from "@/utils/DateToday"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getMonitoringUsers(id_creditor: number = 0, id_ocorrence: number = 0, id_aging: number = 0, negotiator_name: string = "", negotiator_last_name: string = "", feedback: string = "", date_init: string = getDateToday(), date_end: string = getDateToday(), id_avaliator: number = 0, id_supervisor: number = 0) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-users`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_creditor, id_ocorrence, id_aging, negotiator_name, negotiator_last_name, feedback, date_init, date_end, id_avaliator, id_supervisor }),
        cache: "no-cache",
        next: {
            tags: ["getAllMonitoringRealizedUsers"]
        }
    })
        .then(async (value) => {
            const data = await value.json()
            
            if (data.errors.length > 0 || data.data.length == 0) {
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
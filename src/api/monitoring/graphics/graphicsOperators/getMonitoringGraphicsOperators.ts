'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IOperatorGraphicsResponse } from "@/interfaces/monitoring/graphics/operators-graphics/IOperatorGraphics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getMonitoringGraphicsOperators(id_creditor_unique: number, date_init: string, date_end: string, id_operators: number[]) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-operators`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_creditor_unique, date_init, date_end, id_operators })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    data: null
                }
            }

            return {
                data: data.data as IOperatorGraphicsResponse 
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}

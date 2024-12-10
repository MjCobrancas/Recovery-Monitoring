'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetGraphicsOperatorsResponse } from "@/interfaces/monitoring/graphics/operators-graphics/IFilterOperatorGraphics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getGraphicsOperators(id_creditor_unique: number, date_init: string, date_end: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-operators-id`, {
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

            if (data.errors.length > 0) {
                return {
                    data: null
                }
            }

            return {
                data: data.data as IGetGraphicsOperatorsResponse[]
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}

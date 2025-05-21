'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetOperatorGraphic } from "@/interfaces/monitoring/graphics/operator-graphic/IGetOperatorGraphic"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getGraphicsOperatorTotal(id_operator: number, date_init: string, date_end: string) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-monitoring-graphics-operator-total`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_operator, date_init, date_end })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                console.log(data.errors)

                return {
                    data: null
                }
            }

            return {
                data: data.data as IGetOperatorGraphic[]
            }
        })
        .catch((error) => {
            return {
                data: null
            }
        })

    return resp
}

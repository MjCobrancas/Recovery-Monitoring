'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function createMonitoringFeedback(id_operator: number, reason: string, observation: string) {

    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/create-monitoring-feedback`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({
            id_operator,
            id_responsable: userValues.id,
            reason,
            observation
        })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return false
            }

            return true
        })
        .catch((error) => {
            return false
        })

    return resp
}
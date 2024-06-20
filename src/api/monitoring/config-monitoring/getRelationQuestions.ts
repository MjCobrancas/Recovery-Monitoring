'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IQuestionsResponse } from "@/interfaces/components/monitoring/config-monitoring/IHeaderSelectConfig"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getRelationQuestions<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-questions-config`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object),
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status != 200) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data as IQuestionsResponse,
                status: true
            }
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            }
        })

    return resp
}
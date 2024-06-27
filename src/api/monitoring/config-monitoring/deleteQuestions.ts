'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function deleteQuestions<T>(object: T) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/delete-questions-config`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify(object),
    })
        .then(async (value) => {
            const data = await value.json()

            if (value.status == 400 || data.errors.length > 0) {
                return false
            }

            return true
        })
        .catch((error) => {
            return false
        })

    return resp
}
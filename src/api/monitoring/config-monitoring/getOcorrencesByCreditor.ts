'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getOcorrencesByCreditor(idCreditor: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-creditor-relation-with-ocorrence/${idCreditor}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.length == 0) {
                return {
                    data: null,
                    status: false,
                }
            }

            return {
                data: data,
                status: true,
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
'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorRelationWithCreditorUnique(idCreditor: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-creditor-relation-with-creditor-unique/${idCreditor}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.data.length == 0) {
                return {
                    data: [],
                    status: false,
                }
            }

            return {
                data: data.data as ICreditorsUnique[],
                status: true,
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
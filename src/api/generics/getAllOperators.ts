'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IGetAllOperators } from "@/interfaces/generics/IGetAllOperators"
import { GetUserToken } from "@/utils/GetUserToken"

async function getAllOperators() {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-operators`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken
        }
    }).then(async (value) => {
        const data = await value.json()

        if (data.errors.length > 0) {
            return []
        }

        return data.data as IGetAllOperators[]
    }).catch((err) => {
        return []
    })

    return resp
}

export { getAllOperators }

'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function verifyUserToken() {

    try {
        const userParse: ITokenUserInitialValues = GetUserToken()

        const resp = await fetch(`${process.env.BACKEND_DOMAIN}/verify-token`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            }
        })
            .then(async (value) => {

                if (value.status != 200) {
                    return false
                }

                return true
            })
            .catch((error) => {
                return false
            })

        return resp
    } catch(err) {
        return false
    }
    
}
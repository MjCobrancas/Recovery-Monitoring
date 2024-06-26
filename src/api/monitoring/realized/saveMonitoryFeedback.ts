'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { revalidateTag } from "next/cache"

export async function saveMonitoryFeedback(idForm: number, idResponsable: number) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-monitoring-feedback`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({
            id_form: idForm,
            id_responsable: idResponsable
        })
    })
        .then(async (value) => {
            const data = await value.json()

            if (!data.status) {
                return {
                    status: false
                }
            }

            return {
                status: true
            }
        })
        .catch((error) => {
            return {
                status: false
            }
        })

    revalidateTag("getAllMonitoringRealizedUsers")
    revalidateTag("filterRealizedMonitoring")

    return resp
}
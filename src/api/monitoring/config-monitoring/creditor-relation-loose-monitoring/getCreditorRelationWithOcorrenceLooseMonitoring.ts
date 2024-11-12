'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IOcorrencesRelation } from "@/interfaces/monitoring/config-monitoring/relation-loose-monitoring/IOcorrencesRelation"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorRelationWithOcorrenceLooseMonitoring(id_creditor_unique: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-creditor-relation-with-ocorrence-loose-monitoring/${id_creditor_unique}`, {
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
                data: data.data as IOcorrencesRelation[],
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
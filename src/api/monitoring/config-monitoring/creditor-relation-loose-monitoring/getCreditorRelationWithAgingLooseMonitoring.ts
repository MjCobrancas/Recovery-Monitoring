'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { IAgingsRelation } from "@/interfaces/monitoring/config-monitoring/relation-loose-monitoring/IAgingsRelation"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getCreditorRelationWithAgingsLooseMonitoring(id_creditor_unique: number, id_ocorrence: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-creditor-relation-agings-loose-monitoring/${id_creditor_unique}/${id_ocorrence}`, {
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
                data: data.data as IAgingsRelation[],
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
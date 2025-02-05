"use server";

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { IMonitoringResponse } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringQuestions";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getMonitoringQuestions(values: { Id_Creditor: number, Id_Creditor_Unique: number, Id_Ocorrence: number, Id_Aging: number }[]) {
    const userParse: ITokenUserInitialValues = GetUserToken();

    let object = {
        creditor: 0,
        creditor_unique: 0,
        ocorrence: 0,
        fase: 0
    }

    object.creditor = values[0].Id_Creditor
    object.creditor_unique = values[0].Id_Creditor_Unique
    object.ocorrence = values[0].Id_Ocorrence
    object.fase = values[0].Id_Aging

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-questions-monitoring`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
            body: JSON.stringify(object),
        }
    )
        .then(async (value) => {
            const data: IMonitoringResponse = await value.json();

            console.log(data)

            if (value.status == 400) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data,
                status: true
            };
        })
        .catch(() => {
            return {
                data: null,
                status: false
            }
        })

    return resp
}
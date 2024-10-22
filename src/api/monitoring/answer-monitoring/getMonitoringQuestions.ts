"use server";

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getMonitoringQuestions(values: { Id_Creditor: number, Id_Ocorrence: number, Id_Aging: number, id_user: number }[]) {
    const userParse: ITokenUserInitialValues = GetUserToken();

    let object = {
        creditor: 0,
        ocorrence: 0,
        fase: 0
    }

    object.creditor = values[0].Id_Creditor
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
        .then(async (value: any) => {
            const data = await value.json();

            if (value.status == 400) {
                return false;
            }

            return data;
        })
        .catch((error) => {
            return false;
        });

    return resp;
}

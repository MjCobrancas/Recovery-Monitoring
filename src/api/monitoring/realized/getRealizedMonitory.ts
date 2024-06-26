'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { IDialogMonitoryUser } from "@/interfaces/monitoring/realized/IDialogMonitoryUser";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getRealizedMonitory(idForm: number) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-monitoring-questions/${idForm}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
        }
    )
        .then(async (value) => {
            const data = await value.json();

            if (value.status != 200 || data.message != undefined) {
                return {
                    data: null,
                    status: false
                }
            }

            return {
                data: data as IDialogMonitoryUser,
                status: true
            };
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            };
        });

    return resp;
}

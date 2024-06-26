'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { IBackOffices } from "@/interfaces/generics/IBackOffices";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getAllBackOffice() {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-backoffices`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
    })
        .then(async (value) => {
            const data = await value.json();

            if (value.status == 400) {
                return {
                    data: null,
                    status: false
                };
            }

            return {
                data: data as IBackOffices[],
                status: true
            };
        })
        .catch((error) => {
            return {
                data: null,
                status: false
            }
        });

    return resp;
}

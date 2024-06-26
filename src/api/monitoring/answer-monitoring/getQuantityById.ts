"use server";

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getQuantityById(idAgenda: string) {
    const userParse: ITokenUserInitialValues = GetUserToken();

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-quantity-by-id/${idAgenda}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
        }
    )
        .then(async (value: any) => {
            const data = await value.json();

            if (data.message == "Agenda not found") {
                return {
                    data: null,
                    status: false,
                };
            }

            return data;
        })
        .catch(() => {
            return {
                data: null,
                status: false,
            };
        });

    return resp;
}

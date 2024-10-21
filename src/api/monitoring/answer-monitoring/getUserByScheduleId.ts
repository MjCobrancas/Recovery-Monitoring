"use server";

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getUserByScheduleId(idSchedule: string) {
    const userParse: ITokenUserInitialValues = GetUserToken();

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-user-by-schedule-id/${idSchedule}`,
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

            if (data.message == "idSchedule not found") {
                return {
                    data: null,
                    status: false,
                };
            }

            return data.data;
        })
        .catch(() => {
            return {
                data: null,
                status: false,
            };
        });

    return resp;
}

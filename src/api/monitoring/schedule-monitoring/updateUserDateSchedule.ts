'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";
import { revalidateTag } from "next/cache";

export async function updateUserDateSchedule(id_schedule: number, date: string) {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-user-date-schedule`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({ id_schedule, date })
    })
        .then(async (value) => {
            if (value.status != 200) {
                return {
                    data: '',
                    status: false,
                };
            }

            return {
                data: 'updated',
                status: true,
            };
        })
        .catch((error) => {

            return {
                data: '',
                status: false,
            };
        });

    revalidateTag("get-all-schedules")
    return resp
}

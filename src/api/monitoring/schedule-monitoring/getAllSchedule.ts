'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { ISchedulesQuantity, ISchedulesResponse } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getAllSchedule(skip: string = "0", take: string = "15") {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-all-agenda?&skip=${skip}&take=${take}`,
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
            const listed = await value.json();

            const agendas = {
                data: listed.data as ISchedulesResponse[],
                count: listed.length as number,
                quantity: listed.quantityDataNumbers as ISchedulesQuantity,
            };

            if (value.status == 400) {
                return {
                    agendas: {
                        data: [],
                        count: 0,
                        quantity: {
                            late: 0,
                            today: 0,
                            future: 0,
                            negotiators: 0
                        },
                    },
                    status: false,
                };
            }

            return {
                agendas,
                status: true,
            };
        })
        .catch((error) => {
            return {
                agendas: {
                    data: [],
                    count: 0,
                    quantity: {
                        late: 0,
                        today: 0,
                        future: 0,
                        negotiators: 0
                    },
                },
                status: false,
            };
        });

    return resp;
}

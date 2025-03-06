'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { ISchedulesQuantity, ISchedulesResponse } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { GetUserToken } from "@/utils/GetUserToken";

export async function getAllSchedule(id_creditor: number = 0, id_ocorrence: number = 0, id_aging: number = 0, negotiator_name: string = "", negotiator_last_name: string = "", date_type: string = "") {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(
        `${process.env.BACKEND_DOMAIN}/get-users-schedules`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userParse.accessToken,
            },
            body: JSON.stringify({ id_creditor, id_ocorrence, id_aging, negotiator_name, negotiator_last_name, date_type }),
            next: {
                tags: ["get-all-schedules"]
            }
        }
    )
        .then(async (value) => {
            const listed = await value.json();

            const agendas = {
                data: listed.data.data as ISchedulesResponse[],
                count: listed.data.data.length as number,
                quantity: listed.data.quantityDataNumbers as ISchedulesQuantity,
            }

            if (listed.errors.length || listed.data.data.length == 0) {
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
                }
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
            }
        })

    return resp;
}

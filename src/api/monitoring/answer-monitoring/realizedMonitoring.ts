'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";

export async function realizedMonitoring<T>(object: T) {
    const userParse: ITokenUserInitialValues = GetUserToken();

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/monitoring-main`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: JSON.stringify(object),
    })
      .then(async (value: any) => {
        const data = await value.json()
  
        if (data.errors.length != 0) {
          return {
            data: undefined,
            status: false,
          }
        }
  
        return {
          data: data,
          status: true,
        }
      })
      .catch((error) => {
        return {
          data: undefined,
          status: false,
        }
      })
  
    return resp
  }
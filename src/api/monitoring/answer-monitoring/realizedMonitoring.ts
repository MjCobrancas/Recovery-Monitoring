'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";
import { parseJWT } from "@/utils/ParseJWT";

export async function realizedMonitoring(object: any) {
    const userParse: ITokenUserInitialValues = GetUserToken();

    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    object.config.idEvaluator = userValues.id
    
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
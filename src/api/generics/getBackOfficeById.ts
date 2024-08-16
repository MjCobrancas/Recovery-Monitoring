'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function getBackOffice() {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-backoffice/${userValues.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (value.status == 400) {
          return []
        }
  
        return data.data
      })
      .catch((error) => {
        return []
      })
  
    return resp
  }
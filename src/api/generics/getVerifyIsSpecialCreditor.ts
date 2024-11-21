'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getVerifyIsSpecialCreditor(id_creditor: number) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/verify-is-special-creditor/${id_creditor}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (data.errors.length > 0) {
          return false
        }
  
        return data.data
      })
      .catch((error) => {
        return false
      })
  
    return resp
  }
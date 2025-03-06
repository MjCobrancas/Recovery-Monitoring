'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllSupervisors(id_unique_creditor: number = 0) {
    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-responsable-creditors`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userParse.accessToken,
      },
      body: JSON.stringify({ id_unique_creditor })
    })
      .then(async (value) => {
        const data = await value.json()
  
        if (data.errors.length > 0) {
          return []
        }
  
        return data.data
      })
      .catch((error) => {
        return []
      })
  
    return resp
  }
import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { IGetUserPermission } from "@/interfaces/generics/IGetUserPermission"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function getUserPermission() {

    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-user-permission/${userValues.id}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        }
    })
        .then(async (value: any) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    Permission_Level_Id: 6
                }
            }

            return data.data as IGetUserPermission
        })
        .catch((error) => {
            return {
                Permission_Level_Id: 6
            }
        })

    return resp
}
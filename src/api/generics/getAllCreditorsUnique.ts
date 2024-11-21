import { ITokenUserInitialValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"

export async function getAllCreditorsUnique() {

    const userParse: ITokenUserInitialValues = GetUserToken()

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/get-all-creditors-unique`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        next: {
            tags: ["allCreditorsUnique"]
        }
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
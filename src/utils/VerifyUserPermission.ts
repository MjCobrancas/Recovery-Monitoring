'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics";
import { GetUserToken } from "./GetUserToken";
import { parseJWT } from "./ParseJWT";

export async function verifyUserPermission() {
    const userParse: ITokenUserInitialValues = GetUserToken()
    const userTokenValues: ITokenUserValues = parseJWT(userParse.accessToken)

    return userTokenValues.permission
}

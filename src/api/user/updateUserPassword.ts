'use server'

import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics"
import { GetUserToken } from "@/utils/GetUserToken"
import { parseJWT } from "@/utils/ParseJWT"

export async function updateUserPassword(old_password: string, new_password: string) {

    const userParse: ITokenUserInitialValues = GetUserToken()
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)

    const resp = await fetch(`${process.env.BACKEND_DOMAIN}/update-user-password`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userParse.accessToken,
        },
        body: JSON.stringify({
            id_user: userValues.id,
            old_password,
            new_password
        })
    })
        .then(async (value) => {
            const data = await value.json()

            if (data.errors.length > 0) {
                return {
                    message: data.errors[0].message == "Old password is incorrect" ? "A senha atual não é a senha correspondente do usuário" : "Houve um erro ao atualizar a senha do usuário, revise os valores e tente novamente!",
                    status: false
                }
            }

            return {
                message: "Senha do usuário atualizada com sucesso!",
                status: true
            }
        })
        .catch((error) => {
            return {
                message: "Houve um erro ao atualizar a senha do usuário, revise os valores e tente novamente!",
                status: false
            }
        })

    return resp
}

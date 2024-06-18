'use server'

import { FieldValues } from "react-hook-form";
import SetUserCookies from "./SetUserCookies";

export default async function AuthenticateUser(data: FieldValues) {
    let validToken = false
    const result = await fetch(`${process.env.BACKEND_DOMAIN}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: data.userName, password: data.password })
    }).then(async (value) => {
        const data = await value.json()

        if (!value.ok && data.status != 200) {
            throw new Error(value.statusText)
        }

        validToken = true

        await SetUserCookies(data, value.ok)

        return {
            data: "",
            status: true
        }

    })
    .catch(() => {
        return {
            data: "",
            status: false
        }
    })
    .finally(() => {
        if (!validToken) {
            return {
                data: "",
                status: false
            }
        }

        return {
            data: "",
            status: true
        }
    })

    return result

}
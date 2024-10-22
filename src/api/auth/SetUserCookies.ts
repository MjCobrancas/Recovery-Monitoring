import { cookies } from "next/headers";
import { IResult } from "@/interfaces/Generics";

export default async function SetUserCookies(response: IResult, status: boolean) {

    if (status) {
        cookies().set("user", JSON.stringify(response), {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 60 * 60 * 24 * 7, // one week
        })

        const object = {
            idUser: response.idUser,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
        }

        await fetch(`${process.env.MANAGEMENT_DOMAIN}/api/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        }).catch((err) => {
            console.log("Erro ao logar na aplicação de monitoria")
            return
        })

        await fetch(`${process.env.COACHING_DOMAIN}/api/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        }).catch((err) => {
            console.log("Erro ao logar na aplicação de coaching")
            return
        })

        await fetch(`${process.env.WORKOUT_DOMAIN}/api/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        }).catch((err) => {
            console.log("Erro ao logar na aplicação de workout")
            return
        })

        await fetch(`${process.env.TASKS_DOMAIN}/api/auth/login`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(object)
        }).catch((err) => {
            console.log("Erro ao logar na aplicação de tasks")
            return
        })

    }

}

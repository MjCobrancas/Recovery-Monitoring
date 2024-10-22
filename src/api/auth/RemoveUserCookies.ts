'use server'

import { cookies } from "next/headers"

export default async function RemoveUserCookies() {
    cookies().delete("user")

    await fetch(`${process.env.MANAGEMENT_DOMAIN}/api/auth/logout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).catch((err) => {
        console.log("Erro ao deslogar na aplicação de monitoria")
        return
    })

    await fetch(`${process.env.COACHING_DOMAIN}/api/auth/logout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).catch((err) => {
        console.log("Erro ao deslogar na aplicação de coaching")
        return
    })

    await fetch(`${process.env.WORKOUT_DOMAIN}/api/auth/logout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).catch((err) => {
        console.log("Erro ao deslogar na aplicação de workout")
        return
    })

    await fetch(`${process.env.TASKS_DOMAIN}/api/auth/logout`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    }).catch((err) => {
        console.log("Erro ao deslogar na aplicação de tasks")
        return
    })

    return
}
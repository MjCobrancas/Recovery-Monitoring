'use server'

import { cookies } from "next/headers";

export async function toggleThemeSetCookie(theme: "light" | "dark") {
    if (theme == "dark") {

        cookies().set("theme", JSON.stringify({ theme: "light" }), {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
            maxAge: 60 * 60 * 24 * 7 // one week
        })

        return
    }

    cookies().set("theme", JSON.stringify({ theme: "dark" }), {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
        maxAge: 60 * 60 * 24 * 7 // one week
    })
}

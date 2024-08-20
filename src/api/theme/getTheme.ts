'use server'

import { cookies } from "next/headers"

export async function getTheme() {
    return cookies().get("theme")
}

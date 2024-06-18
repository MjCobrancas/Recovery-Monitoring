'use server'

import { cookies } from "next/headers"

export default async function RemoveUserCookies() {
    cookies().delete("user")

    return
}
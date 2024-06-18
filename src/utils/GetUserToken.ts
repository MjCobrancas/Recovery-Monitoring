import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export function GetUserToken() {
    const user = cookies().get("user")

    if (!user) {
        return (
            redirect("/login")
        )
    }

    return JSON.parse(user.value)
    
}
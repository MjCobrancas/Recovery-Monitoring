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

    }
    
}

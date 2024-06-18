import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { parseJWT } from "@/utils/ParseJWT";
import { ITokenUserInitialValues, ITokenUserValues } from "@/interfaces/Generics";
import { SidebarCards } from "./SidebarCards";

export function Sidebar() {
    const user = cookies().get("user")

    if (!user) {
        return (
            redirect("/login")
        )
    }

    const userParse: ITokenUserInitialValues = JSON.parse(user.value)
    const userValues: ITokenUserValues = parseJWT(userParse.accessToken)
    const userImage = process.env.BACKEND_DOMAIN

    return (
        <div
            className={`flex relative bg-[--bg-main] min-h-screen dark:bg-[--bg-dark-main] duration-300`}
        >
            <SidebarCards name={userValues.name} userName={userValues.username} position={userValues.position} userImage={userImage!}  />
        </div>
    )

}


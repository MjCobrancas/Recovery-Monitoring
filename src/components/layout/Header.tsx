'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";
import { faArrowRightFromBracket, faMoon } from '@fortawesome/free-solid-svg-icons';
import RemoveUserCookies from '@/api/auth/RemoveUserCookies';
import { useRouter } from 'next/navigation';
import { getTheme } from '@/api/theme/getTheme';
import { toggleThemeSetCookie } from '@/api/theme/toggleTheme';
import { Ancora } from '../Ancora';

export function Header() {
    const [actualTheme, setActualTheme] = useState("light")
    const [firstTime, setFirstTime] = useState(true)
    const router = useRouter()

    useEffect(() => {

        async function handleInitialTheme() {
            const theme = await getTheme()

            if (!theme) {
                setFirstTime(false)

                await toggleThemeSetCookie("dark")

                document.querySelector("html")?.classList.remove("dark")
                setActualTheme("light")

                return
            }

            const themeValue = JSON.parse(theme?.value).theme

            if (themeValue == "dark" && firstTime) {
                setFirstTime(false)

                document.querySelector("html")?.classList.add("dark")
                setActualTheme("dark")
            }
        }

        handleInitialTheme()
    }, [firstTime])

    async function toggleTheme() {

        const theme = await getTheme()

        if (!theme) {
            await toggleThemeSetCookie("light")

            document.querySelector("html")?.classList.remove("dark")
            setActualTheme("light")

            return
        }

        if (actualTheme == "dark") {
            await toggleThemeSetCookie("dark")

            document.querySelector("html")?.classList.remove("dark")
            setActualTheme("light")

            return
        } 
        
        if (actualTheme == "light") {
            await toggleThemeSetCookie("light")

            document.querySelector("html")?.classList.add("dark")
            setActualTheme("dark")

            return 
        }
        
    }

    async function disconectUser() {
        await RemoveUserCookies()

        router.push("/login")
    }

    return (
        <div
            className={`fixed w-full text-right z-[999] duration-300 p-4 pb-0 bg-[--bg-main] dark:bg-[--bg-dark-main] print:hidden`}
        >
            <div className="h-[35px] flex justify-end items-start">
                <Ancora 
                    title='Alterar senha'
                    toGo='/change-password'
                    styles='dark:text-white'
                />

                <button
                    type="button"
                    onClick={() => toggleTheme()}
                    title="Modo claro/escuro"
                    className={`pl-3 text-lg font-semibold h-0 duration-200 hover:text-[--hover-dark-theme] dark:hover:text-[--hover-dark-theme] dark:text-[--text-white]`}
                >

                    {actualTheme == "light" || "" ? (
                       <FontAwesomeIcon icon={faSun} />
                    ) : (
                        <FontAwesomeIcon icon={faMoon} />
                    )}

                </button>
                <button
                    type="button"
                    title="Deslogar"
                    className={`pl-3 ml-2 text-lg font-semibold h-0 duration-200 hover:text-[--hover-dark-logout] dark:hover:text-[--hover-dark-logout] dark:text-[--text-white]`}
                    onClick={() => disconectUser()}
                >
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                </button>
            </div>

        </div>
    )

}
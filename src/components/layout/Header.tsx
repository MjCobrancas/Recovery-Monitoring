'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from "@fortawesome/free-regular-svg-icons"
import { useEffect, useState } from "react";
import { faArrowRightFromBracket, faMoon } from '@fortawesome/free-solid-svg-icons';
import RemoveUserCookies from '@/api/auth/RemoveUserCookies';
import { useRouter } from 'next/navigation';

export function Header() {
    const [actualTheme, setActualTheme] = useState("light")
    const [firstTime, setFirstTime] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme == "dark" && firstTime) {
            setFirstTime(false)
            document.querySelector('html')?.classList.add("dark")
            setActualTheme(theme!)
        }
    }, [firstTime])

    function toggleTheme() {

        if (actualTheme == "dark") {
            document.querySelector('html')?.classList.remove("dark")
            localStorage.setItem("theme", "light")
            setActualTheme("light")
            return
        } 
        
        if (actualTheme == "light") {
            document.querySelector('html')?.classList.add("dark")
            localStorage.setItem("theme", "dark")
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
            className={`fixed w-full text-right z-20 duration-300 p-4 pb-0 bg-[--bg-main] dark:bg-[--bg-dark-main]`}
        >
            <div className="h-[35px] flex justify-end items-start">
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
'use client'

import { getTheme } from "@/api/theme/getTheme"
import { toggleThemeSetCookie } from "@/api/theme/toggleTheme"
import { faPrint } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function CallPrinter() {

    async function handleCallPrinter() {
        const theme = await getTheme()

        if (!theme) {
            return
        }

        const themeValue = JSON.parse(theme.value).theme

        if (themeValue == "dark") {
            await toggleThemeSetCookie(themeValue)
            document.querySelector("html")?.classList.remove("dark")

            window.print()

            await toggleThemeSetCookie("dark")
            document.querySelector("html")?.classList.add("dark")

            return
        }

        window.print()
    }

    return (
        <button 
            onClick={() => handleCallPrinter()}
            className="float-right mr-1 mb-1 w-fit gap-1 flex items-center justify-center bg-transparent border border-[--focus-input-login] transition duration-200 rounded-lg text-[--text-button-login] outline-none focus:bg-[--text-title-login] focus:text-[--text-white] font-bold text-lg p-3 hover:bg-[--text-title-login] hover:text-[--text-white] disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200 print:hidden"
        >
            <FontAwesomeIcon icon={faPrint} />
            Imprimir
        </button>
    )
}

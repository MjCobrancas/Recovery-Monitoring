import { IButton } from "@/interfaces/components/Button";
import { twMerge } from "tailwind-merge";

export function Button({ type = "submit", name = "", text, styles = "", value, disabled = false, OnClick, children }: IButton) {

    return (
        <button
            type={type}
            name={name}
            value={value}
            className={twMerge(
                `w-full flex items-center justify-center bg-transparent border border-[--focus-input-login] transition duration-200 rounded text-[--text-button-login] outline-none focus:bg-[--text-title-login] focus:text-[--text-white] font-bold text-lg p-3 hover:bg-[--text-title-login] hover:text-[--text-white] disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`,
                styles
            )}
            onClick={OnClick}
            disabled={disabled}
        >
            {text}
            {children}
        </button>
    )

}
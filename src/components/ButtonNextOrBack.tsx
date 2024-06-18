import { IButtonNextOrBack } from "@/interfaces/components/ButtonNextOrBack";
import { twMerge } from "tailwind-merge";

export function ButtonNextOrBack({ styles, name, value, type = "submit", title, disabled = false, OnClick }: IButtonNextOrBack) {

    return (
        <button
            type={type}
            name={name}
            value={value}
            disabled={disabled}
            onClick={OnClick}
            data-moreCSS={styles}
            className={twMerge(
                `
                duration-150 bg-[--bg-button-user] dark:bg-[--bg-button-user-dark] hover:bg-[--light-blue] hover:text-[--text-white] dark:hover:bg-[--light-blue] font-semibold px-2 py-1 rounded-sm rounded-bl-lg disabled:bg-slate-300 disabled:border-none disabled:cursor-not-allowed
                disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200
                `,
                styles
            )}
        >
            {title}
        </button>
    )
}
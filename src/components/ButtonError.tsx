import { IButtonError } from "@/interfaces/components/ButtonError";
import { twMerge } from "tailwind-merge";

export function ButtonError({ name, styles, type = "submit", onClick }: IButtonError) {
    return (
        <button
            type={type}
            data-moreCSS={styles}
            className={twMerge(
                `
                border-2 border-red-400 p-2 px-4 rounded-md duration-150
                font-semibold hover:bg-red-400 hover:text-white
                `, styles
            )}
            onClick={onClick}
        >
            {name}
        </button>
    )
}
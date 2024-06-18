import { IButtonSave } from "@/interfaces/components/ButtonSave";
import { twMerge } from "tailwind-merge";

export function ButtonSave({ styles, name, type = "submit", OnClick }: IButtonSave) {

    return (
        <button
            type={type}
            onClick={OnClick}
            data-moreCSS={styles}
            className={twMerge(
                `
                border-2 border-green-500 p-2 px-4 rounded-md duration-150
                font-semibold hover:bg-green-500 hover:text-white
                 `,
                styles
            )}
        >
            {name}
        </button>
    )
}
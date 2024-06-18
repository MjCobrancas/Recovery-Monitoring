import { IInputQuestion } from "@/interfaces/components/InputQuestion";
import { twMerge } from "tailwind-merge";

export function InputQuestion({ id, name, placeholder, required = false, maxlength = undefined, text, autocomplete = "off", styles }: IInputQuestion) {

    return (
        <input
            type="text"
            id={id}
            name={name}
            placeholder={placeholder}
            required={required}
            maxLength={maxlength}
            autoComplete={autocomplete}
            data-moreCSS={styles}
            className={twMerge(
                `
                mt-1 p-2 border-2 rounded outline-none transition
                font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                focus:border-[--focus-input-login]
                `,
                styles
            )}
            value={text}
        />
    )
}
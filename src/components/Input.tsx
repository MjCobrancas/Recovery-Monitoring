import { twMerge } from "tailwind-merge";
import { IInputForm } from "@/interfaces/components/Input";

export function Input({ type, name, id, value = "", required = false, placeholder = "", maxlength, autocomplete = "off", accept = "", min, max, keydown, onInput, disabled = false, styles = "", onForm = false, register }: IInputForm) {

    return (
        <>
            {onForm ? (
                <input
                    id={id}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    maxLength={maxlength}
                    autoComplete={autocomplete}
                    data-morecss={styles}
                    className={twMerge(
                        `mt-1 p-2 border-2 rounded outline-none transition
                    font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                    duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                    dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                    dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                    focus:border-[--focus-input-login]`,
                        styles
                    )}
                    accept={accept}
                    min={min}
                    max={max}

                    onKeyDown={keydown}
                    onInput={onInput}
                    disabled={disabled}
                    {...register!(name)}
                />
            ) : (
                <input
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    required={required}
                    placeholder={placeholder}
                    maxLength={maxlength}
                    autoComplete={autocomplete}
                    data-morecss={styles}
                    className={twMerge(
                        `mt-1 p-2 border-2 rounded outline-none transition
                    font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                    duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                    dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark] disabled:opacity-75 disabled:cursor-not-allowed
                    dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                    focus:border-[--focus-input-login]`,
                        styles
                    )}
                    accept={accept}
                    min={min}
                    max={max}

                    onKeyDown={keydown}
                    onInput={onInput}
                    disabled={disabled}
                />
            )}
        </>
        
    )

}


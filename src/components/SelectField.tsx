import { ISelectField } from "@/interfaces/components/SelectField";
import { twMerge } from "tailwind-merge";

export function SelectField({ id, name, required = false, disabled = false, multiple = false, styles, OnChange, children, onForm, register, value }: ISelectField) {

    return (
        <>
            {onForm ? (
                <select
                    multiple={multiple}
                    id={id}
                    required={required}
                    disabled={disabled}
                    className={twMerge(
                        `
                        border-2 text-[--text-label-login]
                        dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:[color-scheme:dark]
                        dark:text-[--text-input-dark] outline-none p-2 mt-1 rounded-md flex flex-col w-full
                        disabled:cursor-not-allowed
                        `,
                        styles
                    )}
                    {...register!(name, {
                        onChange: OnChange
                    })}
                >
                    {children}
                </select>
            ) : (
                <select
                    multiple={multiple}
                    name={name}
                    id={id}
                    onChange={OnChange}
                    required={required}
                    disabled={disabled}
                    className={twMerge(
                        `
                        border-2 text-[--text-label-login]
                        dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:[color-scheme:dark]
                        dark:text-[--text-input-dark] outline-none p-2 mt-1 rounded-md flex flex-col w-full
                        disabled:cursor-not-allowed
                        `,
                        styles
                    )}
                >
                    {children}
                </select>
            )}

        </>
    )
}
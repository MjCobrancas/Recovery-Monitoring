import { IInputSearchUser } from "@/interfaces/components/InputSearchUser";
import { twMerge } from "tailwind-merge";

export function InputSearchUser({ id, name, title, value, placeholder, maxlength = undefined, searchUser, styles, onForm, register }: IInputSearchUser) {

    return (
        <>

            {onForm ? (
                <input
                    type="text"
                    id={id}
                    title={title}
                    value={value}
                    placeholder={placeholder}
                    maxLength={maxlength}
                    data-moreCSS={styles}
                    className={twMerge(
                        `
                        text-neutral-800 mt-1 p-2 border-2 rounded outline-none transition
                        font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                        duration-200 placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                        dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark]
                        dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                        focus:border-[--focus-input-login] max-md:max-w-2/3
                        `,
                        styles
                    )}
                    {...register!(name)}
                />
            ) : (
                <input
                    type="text"
                    id={id}
                    name={name}
                    value={value}
                    title={title}
                    placeholder={placeholder}
                    maxLength={maxlength}
                    data-moreCSS={styles}
                    className={twMerge(
                        `
                        text-neutral-800 mt-1 p-2 border-2 rounded outline-none transition
                        font-semibold text-[--text-label-login] dark:[color-scheme:dark]
                        duration-200 placeholder:text-[--text-placeholder-login] placeholder:font-medium 
                        dark:bg-[--bg-dark-options] dark:placeholder:text-slate-400 dark:text-[--text-input-dark]
                        dark:border-[--border-dark] dark:focus:border-[--focus-input-login]
                        focus:border-[--focus-input-login] max-md:max-w-2/3
                        `,
                        styles
                    )}
                />
            )}
        </>

    )
}
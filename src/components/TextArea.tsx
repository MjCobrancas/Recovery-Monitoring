import { TextAreaProps } from "@/interfaces/components/TextArea";
import { twMerge } from "tailwind-merge";

export function TextArea({ name, onForm, placeholder, styles,min = 0, max = 1200, disabled = false, register, OnChange, value }: TextAreaProps) {

    return (
        <>
            {onForm ? (
                <textarea
                    id={name}
                    className={twMerge(`
                        block w-full outline-none border-[2px] border-slate-200 rounded-md p-1 
                        focus:border-blue-500
                        dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:focus:border-blue-500
                        disabled:opacity-75 disabled:cursor-not-allowed
                        `, 
                    styles)}
                    placeholder={placeholder}
                    minLength={min}
                    maxLength={max}
                    disabled={disabled}
                    value={value}
                    {...register!(name)}
                />
            ) : (
                <textarea
                    id={name}
                    name={name}
                    className={twMerge(`
                        block w-full outline-none border-[2px] border-slate-200 rounded-md p-1 
                        focus:border-blue-500
                        dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:focus:border-blue-500
                        disabled:opacity-75 disabled:cursor-not-allowed
                        `, 
                    styles)}
                    placeholder={placeholder}
                    minLength={min}
                    maxLength={max}
                    disabled={disabled}
                    value={value}
                />
            )}
        </>

    )

}

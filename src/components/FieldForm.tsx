import { twMerge } from "tailwind-merge";
import { IFieldForm } from "@/interfaces/components/FieldForm";

export function FieldForm({ label, name, error, obrigatory = true, styles, children, message }: IFieldForm) {

    return (
        <>
            <label htmlFor={label} className={twMerge(`relative font-bold dark:text-[--text-white] text-[--text-label-login] w-full`, styles)}>
                {obrigatory && <span className={`text-[--border-error] mr-1`}>*</span>}
                    
                {name}

                {error && 
                    <span
                        className={`absolute top-0 right-0 truncate text-[--label-color-error] font-medium`}
                    >
                        { message ? message : "inválido(a)!"}
                    </span>
                }

                <slot />
                {children}
            </label>
            
        </>
    )
}


import { twMerge } from "tailwind-merge";

export function TextPrincipal({ text, styles }: ITextPrincipal) {

    return (
        <h1
            data-morecss={styles}
            className={twMerge(
                `
                text-center mt-4 mb-16 text-5xl font-sans font-semibold text-slate-400 dark:text-slate-200
                `,
                styles
            )}
        >
            {text}
        </h1>
    )
}
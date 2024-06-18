import { twMerge } from "tailwind-merge";


export function PaperBlock({ styles, children }: Readonly<{ styles?: string, children: React.ReactNode }>) {

    return (
        <div
            className={twMerge(
                `
            bg-white dark:bg-[--bg-dark-sidebar] dark:text-[--text-white] w-full h-fit
            rounded-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] mt-16 mx-4`,
                styles
            )}
        >
            {children}
            <slot />
        </div>
    )
}
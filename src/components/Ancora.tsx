import { twMerge } from "tailwind-merge";
import Link from 'next/link'
import { IAncora } from "@/interfaces/components/Ancora";

export function Ancora({ title, toGo, styles, children }: IAncora) {

    return (
        <Link
            href={toGo}
            data-morecss={styles}
            className={twMerge(
                `flex items-center justify-center gap-1 duration-150 bg-[--bg-button-user] dark:bg-[--bg-button-user-dark] hover:bg-[--light-blue] hover:text-[--text-white] dark:hover:bg-[--light-blue] font-semibold px-2 py-1 rounded-sm rounded-bl-lg`,
                styles
            )}
        >
            {children}
            {title}
        </Link>
    )

}

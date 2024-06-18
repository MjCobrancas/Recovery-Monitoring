import { ICardConfigMonitoria } from "@/interfaces/components/CardConfigMonitoria"
import { twMerge } from "tailwind-merge"

export function CardConfigMonitoria({ title, subTitle, styles, children }: ICardConfigMonitoria) {

    return (
        <article
            className={twMerge(`flex flex-col justify-between bg-blue-500 w-52 h-52 p-2 rounded-md border-blue-600 border-2 hover:opacity-90 duration-200`, styles)}
        >
            <aside>
                <h3 className={`text-white font-bold text-2xl`}>{title}</h3>

                <span className={`text-slate-100 font-medium`}>{subTitle}</span>
            </aside>

            {children}
        </article>
    )
}
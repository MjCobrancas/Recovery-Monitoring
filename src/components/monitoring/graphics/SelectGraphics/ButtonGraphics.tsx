import { IButtonGraphicsProps } from "@/interfaces/monitoring/graphics/select-graphics/IButtonGraphics";

export function ButtonGraphics({ title, description, graphicType, setGraphicType, OnClick }: IButtonGraphicsProps) {

    return (
        <div
            className="self-start py-4 px-4 w-[200px] h-full border-l-[1px] border-slate-200 data-[active=true]:bg-muted/50"
            data-active={graphicType == setGraphicType}
        >
            <button
                className="w-full h-full flex flex-col justify-start items-center text-muted-foreground text-xs tracking-tight font-normal rounded py-2 self-start"
                type="button"
                onClick={OnClick}
            >
                <span className="uppercase">
                    {title}
                </span>

                <span className="block text-sm text-left mt-2 font-bold text-slate-900 dark:text-white">
                    {description}
                </span>
            </button>
        </div>
    )

}

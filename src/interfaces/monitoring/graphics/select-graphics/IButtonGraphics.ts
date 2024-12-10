import { MouseEventHandler } from "react"

interface IButtonGraphicsProps {
    title: string
    description: string
    graphicType: string
    setGraphicType: string
    OnClick: MouseEventHandler<HTMLButtonElement>
}

export type { IButtonGraphicsProps }

import { MouseEventHandler } from "react"

interface IButton {
    type?: "submit" | "button" | "reset"
    name?: string
    text?: string
    styles?: string
    disabled?: boolean
    OnClick?: MouseEventHandler<HTMLButtonElement>
    value?: string
    children?: React.ReactNode
}

export type { IButton }
import { MouseEventHandler } from "react"

interface IButtonNextOrBack {
    styles?: string
    name?: string
    value?: string
    type?: 'button' | 'submit' | 'reset'
    title: string
    disabled?: boolean
    OnClick?: MouseEventHandler<HTMLButtonElement>
}

export type { IButtonNextOrBack }

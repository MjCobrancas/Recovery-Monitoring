import { MouseEventHandler } from "react"

interface IButtonSave {
    styles?: string
    name: string
    type?: 'button' | 'submit' | 'reset'
    OnClick?: MouseEventHandler<HTMLButtonElement>
}

export type { IButtonSave }

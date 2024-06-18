import { MouseEventHandler } from "react"

interface IButtonError {
    styles?: string
    name: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: MouseEventHandler<HTMLButtonElement>
}

export type { IButtonError }

import { ChangeEventHandler } from "react"
import { FieldValue, UseFormRegister } from "react-hook-form"

interface ISelectField {
    id: string
    name: string
    required?: boolean
    disabled?: boolean
    multiple?: boolean
    styles?: string
    OnChange?: ChangeEventHandler<HTMLSelectElement>
    children: React.ReactNode
    onForm?: boolean
    register?: UseFormRegister<FieldValue<any>>
    value?: string | number

}

export type { ISelectField }

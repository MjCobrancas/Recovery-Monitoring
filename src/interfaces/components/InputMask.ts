import { FormEventHandler } from "react"
import { FieldValue, UseFormRegister } from "react-hook-form"

interface IInputMask {
    id: string
    name: string
    placeholder: string
    required: boolean
    maxlength: number | undefined
    maskCpfCnpj?: string
    autocomplete?: string
    styles: string
    value?: string | number
    onForm?: boolean
    register?: UseFormRegister<FieldValue<any>>
    onInput?: FormEventHandler<HTMLInputElement>
}

export type { IInputMask }

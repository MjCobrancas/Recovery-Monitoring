import { FieldValue, UseFormRegister } from "react-hook-form"

interface IInputWithMask {
    id: string
    name: string
    placeholder: string
    required?: boolean
    maxlength?: number | undefined 
    value: string
    autocomplete?: string
    styles: string,
    onForm?: boolean,
    register?: UseFormRegister<FieldValue<any>>
}

export type { IInputWithMask }
import { ChangeEvent, FormEventHandler } from "react"
import { FieldValue, UseFormRegister } from "react-hook-form"

interface TextAreaProps {
    name: string
    value: string
    onForm: boolean
    styles?: string    
    placeholder?: string
    min?: number
    max?: number
    disabled?: boolean
    register?: UseFormRegister<FieldValue<any>>
    OnChange?: FormEventHandler<HTMLTextAreaElement>
}

export type { TextAreaProps }

import { EventHandler, KeyboardEvent, FormEventHandler } from "react"
import { FieldValue, UseFormRegister } from 'react-hook-form';
import { z } from "zod";

export const createLoginFormSchema = z.object({
    userName: z.string().min(1, "O campo de usuário deve ser preenchido"),
    password: z.string().min(1, "O campo de senha deve ser preenchido")
})

export type createLoginFormData = z.infer<typeof createLoginFormSchema>

type IInput = {
    type: string
    name: string
    id: string
    value: string | number
    required?: boolean
    placeholder?: string
    maxlength?: number | undefined
    autocomplete?: string
    accept?: string
    min?: number | undefined
    max?: number | undefined
    keydown?: EventHandler<KeyboardEvent>
    onInput?: FormEventHandler<HTMLInputElement>
    disabled?: boolean
    styles?: string
    onForm?: boolean
}

interface IInputForm extends IInput, IInputLoginFormRegister {}

type IInputLoginFormRegister = {
    register?: UseFormRegister<FieldValue<any>>
}

export type { IInput, IInputForm }
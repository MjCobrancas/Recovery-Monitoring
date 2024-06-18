import { FieldValue, UseFormRegister } from "react-hook-form"

interface IInputSearchUser {
    id: string
    name: string
    title: string
    placeholder: string
    maxlength?: number | undefined
    searchUser?: string
    styles: string
    onForm: boolean
    value: string
    register?: UseFormRegister<FieldValue<any>>
}

export type { IInputSearchUser }

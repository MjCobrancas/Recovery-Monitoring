interface IFieldForm {
    label?: string
    name: string
    error?: string
    styles?: string
    children: React.ReactNode
    message?: string
    obrigatory?: boolean
}

export type { IFieldForm }
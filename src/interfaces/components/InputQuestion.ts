interface IInputQuestion {
    id: string
    name: string
    placeholder: string
    required: boolean
    maxlength: number | undefined
    text: string
    autocomplete: string
    styles: string
}

export type { IInputQuestion }
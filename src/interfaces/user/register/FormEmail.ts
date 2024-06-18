import { z } from "zod"

interface IFormEmailProps {
    updatePage: (index: number) => void
    setEmailsFormValue: (value: IFormEmail[], isFetchRequest: boolean) => void
    emailsForm: IFormEmail[]
}

interface IFormEmail {
    userEmail: string
    saved: boolean
}

interface IFormEmailCardProps {
    index: number
    item: IFormEmail
    removeUserEmail: (index: number) => void
    resetEmail: (index: number) => void
    saveEmail: (index: number, objectData: IFormEmail) => void
}

export const createFormEmailSchema = z.object({
    userEmail: z.string().refine((value) => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

        return regexEmail.test(value)
    })
})

export type createFormEmailData = z.infer<typeof createFormEmailSchema>

export type { IFormEmailProps, IFormEmail, IFormEmailCardProps }
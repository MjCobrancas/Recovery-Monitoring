import { verifyDDD } from "@/utils/phone/ValidDDD"
import { z } from "zod"

interface IFormContactsProps {
    updatePage: (index: number) => void
    setContactsFormValue: (value: IFormContacts[]) => void
    contactsForm: IFormContacts[]
}

interface IFormContacts {
    ddd: string
    phone: string
    type: string
    saved: boolean
}

interface IFormContactCardFormProps {
    item: IFormContacts
    index: number
    removeContact: (index: number) => void
    resetContact: (index: number) => void
    saveContact: (index: number, objectData: IFormContacts) => void
}

export const createFormContactsSchema = z.object({
    ddd: z.string().refine((value) => {
        const isValidDDD = verifyDDD(value)

        return isValidDDD
    }),
    phone: z.string().refine((value) => {
        const phoneLength = value.length == 9 ? true : false
        const phoneNumber = Number(value) > 0 ? true : false

        if (phoneLength && phoneNumber) {
            return true
        }

        return false
    }),
    type: z.string().refine((value) => {
        return value == "Residencial" || value == "Pessoal"
    })
})

export type createFormContactsData = z.infer<typeof createFormContactsSchema>

export type { IFormContacts, IFormContactCardFormProps, IFormContactsProps }
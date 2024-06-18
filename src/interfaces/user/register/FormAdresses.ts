import { z } from "zod"

interface IFormAdressesProps {
    updatePage: (index: number) => void
    setAdressesFormValue: (value: IFormAdresses[]) => void
    adressesForm: IFormAdresses[]
}

interface IFormAdresses {
    id: number
    address: string
    address2: string
    postalCode: string
    country: string
    neighborhood: string
    city: string
    states: string
    saved: boolean
}

interface IFormAdressesCard {
    item: IFormAdresses
    index: number
    removeAddress: (index: number) => void
    saveAddress: (index: number, data: IFormAdresses) => void 
    resetSaveAddress: (index: number) => void
}

export const createFormAdressesSchema = z.object({
    address: z.string().min(1),
    address2: z.string(),
    cep: z.string().min(1),
    country: z.string().min(1),
    neighborhood: z.string().min(1),
    city: z.string().min(1),
    states: z.enum(["", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"]).refine((value) => {
        if (value == "") {
            return false
        }

        return true
    })
})

export type createFormAdressesData = z.infer<typeof createFormAdressesSchema>

export type { IFormAdressesProps, IFormAdresses, IFormAdressesCard }
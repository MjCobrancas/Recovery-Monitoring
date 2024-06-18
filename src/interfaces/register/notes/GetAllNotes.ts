import { z } from "zod"

interface IGetAllNotes {
    Id_Notes: number
    Days: number
    Description: string
    id?: string
}

interface INotes {
    Notes: IGetAllNotes[]
}

export const editNotesSchema = z.object({
    Notes: z.array(
        z.object({
            Id_Notes: z.number().min(1),
            Days: z.string().min(1),
            Description: z.string().min(1)
        })
    )
})

export type { IGetAllNotes, INotes }
export type editNotesData = z.infer<typeof editNotesSchema>
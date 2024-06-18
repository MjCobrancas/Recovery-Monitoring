import { z } from "zod";

interface IWorkoutUser {
    Id_Phase: number
    Id_User: number
    Name: string
    Last_Name: string
    Phase: string
}

interface IWorkoutPhase {
    Id_Phase: number
    Phase: string
}

interface IWorkoutBackOffice{
    Id_User: string
    Name: string
    Last_Name: string
    Permission_Level_Id: number
}

interface IChangePhase {
    user: IWorkoutUser
    phases: IWorkoutPhase[]
    backOffice: IWorkoutBackOffice[]
    idWorkout: number
}

export const changePhaseFormSchema = z.object({
    workoutPhases: z.enum(["1", "2", "3", "4", "5", "6"]),
    responsable: z.string().refine((value) => {
        return Number(value) > 0
    }, {
        message: "Inválido"
    })
})

export type changePhaseFormData = z.infer<typeof changePhaseFormSchema>

export type { IChangePhase }
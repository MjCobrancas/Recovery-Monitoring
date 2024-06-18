import { UseFormRegister, UseFormWatch, FieldErrors } from "react-hook-form";
import { createLoginFormData } from "@/interfaces/components/Input";

interface IInputPassword<> {
    register: UseFormRegister<createLoginFormData>
    loginError: boolean
    watch: UseFormWatch<createLoginFormData>,
    errors: FieldErrors<createLoginFormData>
}

export type { IInputPassword }

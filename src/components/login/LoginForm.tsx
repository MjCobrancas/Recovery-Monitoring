'use client'

import { useForm, FieldValues } from "react-hook-form"
import { Input } from "../Input";
import { InputPassword } from "./InputPassword";
import { useState } from "react";
import AuthenticateUser from "@/api/auth/AuthenticateUser";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { useRouter } from "next/navigation";
import { Button } from "../Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLoginFormData, createLoginFormSchema } from "@/interfaces/components/Input";

export function LoginForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<createLoginFormData>({
        resolver: zodResolver(createLoginFormSchema)
    })
    const [loginError, setLoginError] = useState(false)
    const router = useRouter()

    async function formOnSubmit(data: FieldValues) {
        const result: unknown = await AuthenticateUser(data)
        const result2: IResultDefaultResponse<string> = result as IResultDefaultResponse<string>

        if (result2 != undefined && result2 != null) {
            if (!result2.status) {
                setLoginError(true)

                setTimeout(() => {
                    setLoginError(false)
                }, 5000)

                return
            }

            router.push("/")
        }

    }

    return (
        <form
            onSubmit={handleSubmit(formOnSubmit)}
            className={`flex flex-col gap-16 max-w-[25rem] w-full`}
        >
            <div className={`flex flex-col w-full]`}>
                <div className={`flex justify-between`}>
                    <label
                        htmlFor="name"
                        className={`font-semibold dark:text-[--text-white] text-[--text-label-login]`}
                    >
                        Nome
                    </label>
                    {errors.userName &&
                        <span className={`text-[--label-color-error] font-medium`}>
                            {errors.userName.message}
                        </span>
                    }
                    {loginError &&
                        <span className={`text-[--label-color-error] font-medium`}>
                            Digite uma senha válida!
                        </span>
                    }
                </div>
                <Input
                    type="text"
                    name="userName"
                    id="name"
                    required={false}
                    placeholder="Digite seu nome"
                    maxlength={60}
                    autocomplete="name"
                    onForm={true}
                    value={watch("userName")}
                    styles={`mt-1 p-3 border-2 rounded outline-none transition
                    font-semibold text-[--text-label-login]
                    duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium focus:border-[--focus-input-login]
                    ${loginError || errors.userName
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                    register={register}
                />
            </div>

            <div className={`flex flex-col w-full relative`}>
                <div className={`flex justify-between`}>
                    <label
                        htmlFor="password"
                        className={`font-semibold dark:text-[--text-white] text-[--text-label-login]`}
                    >
                        Senha
                    </label>
                    {errors.password &&
                        <span className={`text-[--label-color-error] font-medium`}>
                            {errors.password.message}
                        </span>
                    }
                    {loginError &&
                        <span className={`text-[--label-color-error] font-medium`}>
                            Digite uma senha válida!
                        </span>
                    }
                </div>
                <InputPassword register={register} watch={watch} loginError={loginError} errors={errors} />
            </div>

            <Button type="submit" text="Entrar" />
        </form>
    )
}
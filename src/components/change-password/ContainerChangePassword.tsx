'use client'

import { IContainerChangePasswordData, IContainerChangePasswordProps, IContainerChangePasswordSchema } from "@/interfaces/change-password/IContainerChangePassword"
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { Button } from "../Button"
import { FieldForm } from "../FieldForm"
import { Input } from "../Input"
import { updateUserPassword } from "@/api/user/updateUserPassword"

export function ContainerChangePassword({ user }: IContainerChangePasswordProps) {

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IContainerChangePasswordData>({
        defaultValues: {
            old_password: "",
            new_password: "",
            new_confirm_password: ""
        },
        resolver: zodResolver(IContainerChangePasswordSchema)
    })

    async function handleChangePassword(data: FieldValues) {

        if (data.old_password.length < 4 || data.new_password.length < 4 || data.new_confirm_password.length < 4) {
            toast.error("Os campos de senha devem ter no minímo 4 caracteres!", {
                duration: 7000
            })

            return
        }

        if (data.new_password !== data.new_confirm_password) {
            toast.error("Os valores de nova senha e confirme a nova senha devem ter o mesmo valor!", {
                duration: 7000
            })

            return
        }

        if (data.old_password === data.new_password) {
            toast.error("A nova senha não pode ser igual a senha antiga!", {
                duration: 7000
            })

            return
        }

        setDisableButtons(true)

        const { message, status } = await updateUserPassword(data.old_password, data.new_password)

        setDisableButtons(false)

        if (!status) {
            toast.error(message, {
                duration: 7000
            })

            return
        }

        toast.success(message, {
            duration: 5000
        })

        reset()
    }

    return (
        <>
            {user.Permission_Level_Id <= 5 ? (
                <div className="flex justify-center items-center">
                    <form
                        className="flex flex-col gap-8 w-1/2 px-2 py-8 mx-2 border-[1px] rounded-md border-slate-200 dark:border-zinc-700"
                        onSubmit={handleSubmit(handleChangePassword)}
                    >
                        <FieldForm
                            name="Senha atual:"
                            error={errors.old_password && "Inválido"}
                        >
                            <div className="relative">
                                <Input
                                    id="old_password"
                                    name="old_password"
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="Digite a senha atual do usuário"
                                    onForm={true}
                                    register={register}
                                    value={watch("old_password")}
                                    styles={classNames("", {
                                        "border-red-400": errors.old_password
                                    })}
                                    disabled={user.Permission_Level_Id == 6 || disableButtons}
                                />

                                <button
                                    className="absolute bottom-2 right-3"
                                    type="button"
                                    onClick={() => setShowOldPassword(state => !state)}
                                >
                                    <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} className="w-5 h-5 cursor-pointer" />
                                </button>

                            </div>
                        </FieldForm>

                        <FieldForm
                            name="Nova senha:"
                            error={errors.new_password && "Inválido"}
                        >
                            <Input
                                id="new_password"
                                name="new_password"
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Digite a nova senha"
                                onForm={true}
                                register={register}
                                value={watch("new_password")}
                                styles={classNames("", {
                                    "border-red-400": errors.new_password
                                })}
                                disabled={user.Permission_Level_Id == 6 || disableButtons}
                            />

                            <button
                                type="button"
                                className="absolute right-3 bottom-2"
                                onClick={() => setShowNewPassword(state => !state)}
                            >
                                <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} className="w-5 h-5 cursor-pointer" />
                            </button>
                        </FieldForm>

                        <FieldForm
                            name="Confirmar a nova senha:"
                            error={errors.new_confirm_password && "Inválido"}
                        >
                            <Input
                                id="new_confirm_password"
                                name="new_confirm_password"
                                type={showNewConfirmPassword ? "text" : "password"}
                                placeholder="Confirme a nova senha"
                                onForm={true}
                                register={register}
                                value={watch("new_confirm_password")}
                                styles={classNames("", {
                                    "border-red-400": errors.new_confirm_password
                                })}
                                disabled={user.Permission_Level_Id == 6 || disableButtons}
                            />

                            <button
                                type="button"
                                className="absolute right-3 bottom-2"
                                onClick={() => setShowNewConfirmPassword(state => !state)}
                            >
                                <FontAwesomeIcon icon={showNewConfirmPassword ? faEye : faEyeSlash} className="w-5 h-5 cursor-pointer" />
                            </button>
                        </FieldForm>

                        <Button
                            text="Salvar"
                            styles="self-end w-fit text-sm py-2"
                            disabled={user.Permission_Level_Id == 6 || disableButtons}
                        />
                    </form>

                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                </div>
            ) : (
                <p className="text-center text-xl text-red-600 dark:text-red-400">Você não possui permissão para acessar esta rota!</p>
            )}
        </>
    )

}

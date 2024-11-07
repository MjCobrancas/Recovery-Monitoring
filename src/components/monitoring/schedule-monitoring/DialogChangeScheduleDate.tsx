import { verifyUserToken } from "@/api/generics/verifyToken";
import { updateUserDateSchedule } from "@/api/monitoring/schedule-monitoring/updateUserDateSchedule";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IDialogChangeScheduleFormSchema, IDialogChangeScheduleProps } from "@/interfaces/monitoring/schedule-monitoring/IDialogChangeSchedule";
import { getDateToday } from "@/utils/DateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function DialogChangeSchedule({ userSchedule, closeDialog }: IDialogChangeScheduleProps) {
    const router = useRouter()

    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset, setError } = useForm<{ newDate: string }>({
        defaultValues: {
            newDate: ""
        },
        resolver: zodResolver(IDialogChangeScheduleFormSchema)
    })

    async function changeScheduleDate(data: FieldValues) {

        const validToken = await verifyUserToken()

        if (!validToken) {
            router.push("/login")

            return
        }

        const newDate = new Date(data.newDate)
        const currentDate = new Date(getDateToday())

        setDisableAllButtons(true)

        if (newDate.getTime() < currentDate.getTime()) {
            setError("newDate", {
                type: "Invalid datetime condition on timestamp"
            })

            setDisableAllButtons(false)

            toast.error("O campo data deve ser maior ou igual em relação a data de hoje!", {
                duration: 10000
            })

            return
        }

        const response = await updateUserDateSchedule(userSchedule!.id_quantity, data.newDate)

        if (!response.status) {
            setDisableAllButtons(false)

            toast.error("Houve um erro na atualização de data na agenda, revise os valores e tente novamente!", {
                duration: 10000
            })

            return
        }

        setDisableAllButtons(false)

        toast.success("Data de agenda atualizada com sucesso!", {
            duration: 5000
        })

        handleCloseDialog()
    }

    function handleCloseDialog() {
        reset()

        closeDialog()
    }

    return (
        <>
            {userSchedule != null && (
                <div>
                    <h2 className="font-bold text-2xl text-center dark:text-slate-200">
                        Mudar data da monitoria da agenda {userSchedule.id_quantity}
                    </h2>
                    <p className="text-center mt-5 font-semibold dark:text-slate-100">
                        {userSchedule.Name} {userSchedule.Last_Name} | {userSchedule.Creditor} | {userSchedule.Ocorrence} | {userSchedule.Description}
                    </p>
                    <form
                        className="my-10"
                        onSubmit={handleSubmit(changeScheduleDate)}
                    >
                        <div className="flex justify-center items-center gap-2">
                            <FieldForm
                                name="Data atual:"
                                styles="w-fit"
                            >
                                <Input
                                    id="oldDate"
                                    name="oldDate"
                                    type="date"
                                    value={userSchedule.Data.slice(0, 10)}
                                    styles="w-fit block"
                                    disabled={true}
                                />
                            </FieldForm>
                            <FieldForm
                                name="Nova data para a agenda:"
                                styles="w-fit"
                            >
                                <Input
                                    id="newDate"
                                    name="newDate"
                                    type="date"
                                    value={watch("newDate")}
                                    styles={classNames("w-fit block", {
                                        "border-[2px] border-red-400": errors.newDate
                                    })}
                                    onForm={true}
                                    register={register}
                                    disabled={disableAllButtons}
                                />
                            </FieldForm>
                        </div>

                        <Button
                            styles="float-right mt-10 w-fit px-4 py-2 ml-2"
                            text="Salvar"
                            disabled={disableAllButtons}
                        />

                        <Button
                            styles="float-right mt-10 w-fit px-4 py-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white focus:bg-red-400 focus:text-white"
                            text="Fechar"
                            type="button"
                            OnClick={() => handleCloseDialog()}
                            disabled={disableAllButtons}
                        />

                    </form>
                </div>
            )}

            <Toaster 
                reverseOrder={false}
                position="bottom-right"
            />
        </>
    )

}

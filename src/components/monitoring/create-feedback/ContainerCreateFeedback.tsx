'use client'

import { createMonitoringFeedback } from "@/api/monitoring/feedback/createMonitoringFeedback"
import { Ancora } from "@/components/Ancora"
import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Input } from "@/components/Input"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { TextArea } from "@/components/TextArea"
import { IContainerCreateFeedbackProps, ICreateFeedbackData, ICreateFeedbackSchema } from "@/interfaces/monitoring/feedback/container-create-feedback/IContainerCreateFeedback"
import { revalidateMonitoringFeedbacksTags } from "@/utils/monitoring/feedbacks/RevalidateMonitoringFeedbacks"
import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function ContainerCreateFeedback({ operators }: IContainerCreateFeedbackProps) {
    const [disableButtons, setDisableButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, getValues, reset } = useForm<ICreateFeedbackData>({
        defaultValues: {
            id_operator: "0",
            reason: "",
            observation: ""
        },
        resolver: zodResolver(ICreateFeedbackSchema)
    })

    async function handleCreateMonitoringFeedback(data: FieldValues) {

        setDisableButtons(true)

        const status = await createMonitoringFeedback(Number(data.id_operator), String(data.reason), String(data.observation))

        setDisableButtons(false)

        if (!status) {
            toast.error("Houve um erro para salvar o feedback do operador, revise os valores e tente novamente!", {
                duration: 7000
            })

            return
        }

        toast.success("Feedback salvo com sucesso!", {
            duration: 5000
        })

        revalidateMonitoringFeedbacksTags()

        reset()
    }

    return (
        <form
            className="flex flex-col gap-10 px-2 pt-2 my-10 mx-2 border-[1px] border-slate-200 rounded-md dark:border-[--border-dark]"
            onSubmit={handleSubmit(handleCreateMonitoringFeedback)}
        >
            <div className="flex gap-1">
                <FieldForm
                    name="Operador:"
                    styles="w-fit"
                    error={errors.id_operator && "Inválido"}
                >
                    <SelectField
                        id="id_operator"
                        name="id_operator"
                        styles={classNames("w-fit", {
                            "border-red-400 dark:border-red-400": errors.id_operator
                        })}
                        onForm={true}
                        value={watch("id_operator")}
                        register={register}
                        disabled={disableButtons}
                    >
                        <Option value={"0"} firstValue="Selecione um operador" />

                        {operators.map((operator, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={operator.Id_User}
                                    firstValue={`${operator.Name} ${operator.Last_Name}`}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>
                <FieldForm
                    name="Motivo:"
                    error={errors.reason && "Inválido"}
                >
                    <Input
                        id="reason"
                        name="reason"
                        type="text"
                        value={watch("reason")}
                        onForm={true}
                        register={register}
                        styles={classNames("", {
                            "border-red-400 dark:border-red-400": errors.reason
                        })}
                        maxlength={255}
                        disabled={disableButtons}
                    />
                </FieldForm>
            </div>
            <FieldForm
                name="Feedback:"
                error={errors.observation && "Inválido"}
            >
                <p className="text-xs">{getValues("observation").length}/1200</p>
                <TextArea
                    name="observation"
                    value={watch("observation")}
                    onForm={true}
                    register={register}
                    placeholder="Digite o feedback para o operador"
                    styles={classNames("min-h-[200px] max-h-[300px]", {
                        "border-red-400 dark:border-red-400": errors.observation
                    })}
                    disabled={disableButtons}
                />
            </FieldForm>

            <div className="flex justify-between items-center">
                <Ancora
                    title="Voltar"
                    toGo="/monitoring/feedback-list"
                    styles="w-fit mb-1 self-end"
                />

                <Button
                    text="Salvar"
                    styles="w-fit text-base py-2 self-end mb-1"
                    disabled={disableButtons}
                />
            </div>
        </form>
    )

}

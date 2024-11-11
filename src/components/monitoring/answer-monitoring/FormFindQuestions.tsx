'use client'

import { getMonitoringQuestions } from "@/api/monitoring/answer-monitoring/getMonitoringQuestions";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFormFindQuestions, IFormFindQuestionsSchema } from "@/interfaces/monitoring/answer-monitoring/IFormFindQuestions";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FormFindQuestions({ config, creditorsUnique, schedule, setQuestionsValue, setValueIdCreditorUnique }: IFormFindQuestions) {

    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            id_creditor_unique: creditorsUnique.length == 1 ? String(creditorsUnique[0].Id_Unique_Creditor) : "0"
        },
        resolver: zodResolver(IFormFindQuestionsSchema)
    })

    function changeCreditorUnique() {
        setQuestionsValue(null)
        setValueIdCreditorUnique(0)
    }

    async function handleGetQuestions(data: FieldValues) {
        setDisableAllButtons(true)

        const response = await getMonitoringQuestions([{ Id_Creditor: Number(config[0].Id_Creditor), Id_Creditor_Unique: Number(data.id_creditor_unique), Id_Ocorrence: config[0].Id_Ocorrence, Id_Aging: config[0].Id_Aging }])

        if (!response.status) {

            setDisableAllButtons(false)

            toast.error("Houve um erro ao buscar as perguntas de monitoria, por favor tente novamente mais tarde.", {
                duration: 7000
            })

            return
        }

        setDisableAllButtons(false)

        setQuestionsValue(response.data!)
        setValueIdCreditorUnique(Number(data.id_creditor_unique))
    }

    return (
        <form
            className="mt-10 pb-6"
            onSubmit={handleSubmit(handleGetQuestions)}
        >
            <div className="flex justify-center items-center gap-1 mx-16 p-4 border-[2px] rounded-md border-slate-300 dark:border-slate-800">
                <FieldForm
                    name="Equipe:"
                    styles="w-fit"
                >
                    <SelectField
                        id="id_creditor"
                        name="id_creditor"
                        disabled={true}
                        styles="w-fit"
                    >
                        <Option
                            value={"0"}
                            firstValue={schedule[0].Creditor}
                        />
                    </SelectField>
                </FieldForm>
                <FieldForm
                    name="Credor:"
                    styles="w-fit"
                    error={errors.id_creditor_unique && "Inválido"}
                >
                    <SelectField
                        id="id_creditor_unique"
                        name="id_creditor_unique"
                        styles={classNames("w-fit", {
                            "border-red-500": errors.id_creditor_unique
                        })}
                        onForm={true}
                        register={register}
                        value={watch("id_creditor_unique")}
                        OnChange={changeCreditorUnique}
                        disabled={disableAllButtons}
                    >
                        {creditorsUnique.length == 0 && (
                            <Option
                                value={"0"}
                                firstValue="Selecione o credor"
                            />
                        )}

                        {creditorsUnique.length == 1 && (
                            <Option
                                value={creditorsUnique[0].Id_Unique_Creditor}
                                firstValue={creditorsUnique[0].Creditor}
                            />
                        )}

                        {creditorsUnique.length > 1 && (
                            <>
                                <Option
                                    value={"0"}
                                    firstValue="Selecione o credor"
                                />

                                {creditorsUnique.map((creditorUnique, index) => {

                                    return (
                                        <Option
                                            key={index}
                                            value={creditorUnique.Id_Unique_Creditor}
                                            firstValue={creditorUnique.Creditor}
                                        />
                                    )

                                })}
                            </>
                        )}
                    </SelectField>
                </FieldForm>
                <FieldForm
                    name="Ocorrência"
                    styles="w-fit"
                >
                    <SelectField
                        id="id_ocorrence"
                        name="id_ocorrence"
                        disabled={true}
                        styles="w-fit"
                    >
                        <Option
                            value={"0"}
                            firstValue={schedule[0].Ocorrence}
                        />
                    </SelectField>
                </FieldForm>
                <FieldForm
                    name="Fase:"
                    styles="w-fit"
                >
                    <SelectField
                        id="id_aging"
                        name="id_aging"
                        disabled={true}
                        styles="w-fit"
                    >
                        <Option
                            value={"0"}
                            firstValue={schedule[0].Description}
                        />
                    </SelectField>
                </FieldForm>

                <Button
                    type="submit"
                    text="Buscar perguntas"
                    styles="w-fit px-6 py-[6px] self-end ml-2"
                    disabled={disableAllButtons}
                />
            </div>

        </form>
    )

}

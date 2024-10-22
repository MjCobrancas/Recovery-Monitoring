'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { filterSchedule } from "@/api/monitoring/schedule-monitoring/scheduleFilter";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFilterSchedule, scheduleMonitorinSchema, scheduleMonitoringData } from "@/interfaces/monitoring/schedule-monitoring/IFilterSchedule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export function FilterSchedule({ creditors, ocorrences, setFilter }: IFilterSchedule) {

    const router = useRouter()

    const { control, register, handleSubmit, watch, formState: { errors }, setError, reset } 
    = useForm<scheduleMonitoringData>({
        defaultValues: {
            creditor: "0",
            ocorrences: "0",
            data: "0",
            name: ""
        },
        resolver: zodResolver(scheduleMonitorinSchema)
    })

    const [ disableButton, setDisableButton ] = useState(false)
    const [ didFilter, setDidFilter ] = useState(false)

    function resetFilter() {
        reset()
        setDisableButton(false)
        setDidFilter(false)
        setFilter([])
    }

    async function handleScheduleFilterForm(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        let splitedName = data.name.toString().split(' ')
        let firstName = splitedName[0]
        let lastName = splitedName.slice(1).join(' ')

        setDisableButton(true)
        setDidFilter(true)

        const object = {
            id_creditor: Number(data.creditor),
            id_ocorrence: Number(data.ocorrences),
            id_aging: 0,
            date_type: String(data.data),
            negotiator_name: firstName,
            negotiator_last_name: lastName,
            is_done: false
        }

        const scheduleFilter = await filterSchedule<typeof object>(object)

        setDisableButton(false)

        if (!scheduleFilter.status) {
            toast.error("Não há nenhum dado com esses filtros!", {
                duration: 5000
            })

            return
        }

        setFilter(scheduleFilter.data)

        toast.success("Sucesso ao filtrar os dados!", {
            duration: 5000
        })
    }

    return (
        <form onSubmit={handleSubmit(handleScheduleFilterForm)} className={`flex items-end justify-center mx-2 mt-8`}>
            <div className={`flex items-center justify-between gap-2 ml-4 mr-2 font-medium`}>
                <FieldForm
                    label="creditor"
                    name="Credor:"
                    obrigatory={false}
                    styles={`w-fit`}
                    error={errors.creditor && "Inválido"}
                >
                    <SelectField
                        name="creditor"
                        id="creditor"
                        required
                        onForm={true}
                        value={watch("creditor")}
                        register={register}
                        styles={`w-fit`}
                    >
                        <Option
                            value={"0"}
                            firstValue={"Selecione"}
                        />

                        {creditors.map((creditor, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={creditor.Id_Creditor}
                                    firstValue={creditor.Creditor}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="ocorrences"
                    name="Ocorrência:"
                    obrigatory={false}
                    styles={`w-fit`}
                    error={errors.ocorrences && "Inválido"}
                >
                    <SelectField
                        name="ocorrences"
                        id="ocorrences"
                        required
                        onForm={true}
                        value={watch("ocorrences")}
                        register={register}
                        styles={`w-fit`}
                    >
                        <Option
                            value={"0"}
                            firstValue={"Selecione"}
                        />

                        {ocorrences.ocorrence.map((value, i) => {
                            return (
                                <Option
                                    key={i}
                                    value={value.Id_Ocorrence}
                                    firstValue={value.Ocorrence}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="data"
                    name="Data:"
                    obrigatory={false}
                    styles={`w-fit`}
                    error={errors.data && "Inválido"}
                >
                    <SelectField
                        name="data"
                        id="data"
                        required
                        onForm={true}
                        value={watch("data")}
                        register={register}
                        styles={`w-fit`}
                    >
                        <Option
                            value={"0"}
                            firstValue={"Selecione"}
                        />

                        <Option
                            value={"Em dia"}
                            firstValue={"EM DIA"}
                        />

                        <Option
                            value={"Atraso"}
                            firstValue={"ATRASO"}
                        />

                        <Option
                            value={"Futuro"}
                            firstValue={"FUTURO"}
                        />
                    </SelectField>
                </FieldForm>
            </div>

            <FieldForm
                label="name"
                name="Nome/Login:"
                obrigatory={false}
                styles={`w-56`}
            >
                <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Nome ou Login"
                    onForm={true}
                    value={watch("name")}
                    register={register}
                    maxlength={255}
                />
            </FieldForm>

            <Button
                type="submit"
                text="Filtrar"
                disabled={disableButton}
                styles={`w-18 text-md h-11 ml-2`}
            />

            <input
                type="reset"
                value="Remover filtros"
                onClick={() => resetFilter()}
                disabled={!didFilter}
                className={`h-11 w-18 text-md font-medium ml-2 p-2 border border-red-400 text-red-500 
                            rounded-md hover:bg-red-400 hover:text-white duration-200 cursor-pointer
                             disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed
                             disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200
                        `}
            />

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />
        </form>
    )
}
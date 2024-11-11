import { verifyUserToken } from "@/api/generics/verifyToken";
import { filterRealizedAgendas } from "@/api/monitoring/realized/filterRealizedAgendas";
import { getAllMonitoringUser } from "@/api/monitoring/realized/getAllMonitoringUser";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IMonitoryAllUsers } from "@/interfaces/monitoring/realized/IContainerMonitoryRealized";
import { IMonitoryRealizedFilterProps, IMonitoryRealizedForm } from "@/interfaces/monitoring/realized/IMonitoryRealizedFilter";
import { getDateToday } from "@/utils/DateToday";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function MonitoryRealizedFilter({ ocorrences, disableAllButtons, setValueDisableButtons, setValueMonitoryRealized, monitoryUsers, setValueDidFilter, reloadTable, setValueReloadTable, isDidFilter, supervisor, creditorsUnique }: IMonitoryRealizedFilterProps) {

    const router = useRouter()

    const [lastObject, setLastObject] = useState<any>()

    const { register, handleSubmit, watch, formState: { errors }, setError, reset } = useForm<IMonitoryRealizedForm>({
        defaultValues: {
            Data: getDateToday(),
            DataEnd: getDateToday(),
            credor: "0",
            ocorrence: "0",
            supervisor: "0",
            name: "",
            feedback: ""
        }
    })

    const [didFilter, setDidFilter] = useState(false)

    useEffect(() => {

        async function reloadTableValues() {
            if (reloadTable) {
                setValueReloadTable(false)

                if (isDidFilter) {
                    const getFiltredValues = await filterRealizedAgendas<typeof lastObject>(lastObject)

                    if (!getFiltredValues.status) {
                        return
                    }

                    setValueMonitoryRealized(getFiltredValues.data)
                } else if (!isDidFilter) {
                    const monitoryUsers: IResultDefaultResponse<IMonitoryAllUsers[]> = await getAllMonitoringUser()

                    if (!monitoryUsers.status) {
                        return
                    }

                    setValueMonitoryRealized(monitoryUsers.data!)
                }
            }
        }

        reloadTableValues()

    }, [isDidFilter, lastObject, reloadTable, setValueMonitoryRealized, setValueReloadTable])

    function resetForm() {
        reset()
        setDidFilter(false)
        setValueDidFilter(false)
        setValueReloadTable(true)

        setValueMonitoryRealized(monitoryUsers)
    }

    async function handleGetFilter(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        if (String(data.Data).length > 0 || String(data.DataEnd).length > 0) {
            if (String(data.Data).length == 0 || String(data.DataEnd).length == 0) {
                setError("Data", {
                    type: "400"
                })
                setError("DataEnd", {
                    type: "400"
                })

                return
            }
        }

        setValueDisableButtons(true)

        const splitedName = String(data.name).toString().split(' ')
        const name = splitedName?.[0]
        const lastName = splitedName?.slice(1).join(' ');

        const object = {
            id_creditor: Number(data.credor),
            id_ocorrence: Number(data.ocorrence),
            id_aging: 0,
            id_supervisor: Number(data.supervisor),
            date_type: String(data.Data),
            negotiator_name: name.trim(),
            negotiator_last_name: lastName?.trim() || "",
            is_done: true,
            take: 1000,
            skip: 0,
            date_init: String(data.Data),
            date_end: String(data.DataEnd),
            feedback: String(data.feedback)
        }

        setLastObject(object)

        const getFiltredValues = await filterRealizedAgendas<typeof object>(object)

        setValueDisableButtons(false)

        if (!getFiltredValues.status) {
            toast.error("Não há dados baseado nesses filtros. Revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        setValueDidFilter(true)

        setDidFilter(true)

        toast.success("Filtro realizado com sucesso!", {
            duration: 5000
        })

        setValueMonitoryRealized(getFiltredValues.data)
    }

    return (
        <form
            className={`flex flex-col items-center justify-center mx-2 mt-8`}
            onSubmit={handleSubmit(handleGetFilter)}
        >
            <div className="flex justify-center items-center gap-2 mb-4">
                <FieldForm
                    label="Data"
                    name="Data Inicial:"
                    obrigatory={false}
                    styles={`w-full`}
                    error={errors.Data ? "Inválido" : ""}
                >
                    <Input
                        id="Data"
                        name="Data"
                        type="date"
                        value={watch("Data")}
                        styles={`w-full ${errors.Data
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>

                <FieldForm
                    label="DataEnd"
                    name="Data final:"
                    obrigatory={false}
                    styles={`w-full`}
                    error={errors.DataEnd ? "Inválido" : ""}
                >
                    <Input
                        id="DataEnd"
                        name="DataEnd"
                        type="date"
                        value={watch("DataEnd")}
                        styles={`w-full ${errors.DataEnd
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                            }`}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>
            </div>

            <div className={`flex items-center justify-center gap-2 mb-4`}>
                <FieldForm
                    label="name"
                    name="Nome/Login:"
                    obrigatory={false}
                    styles={`w-56`}
                >
                    <Input
                        value={watch("name")}
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nome ou login"
                        maxlength={255}
                        onForm={true}
                        register={register}
                    />
                </FieldForm>

                <FieldForm
                    label="credor"
                    name="Credor:"
                    obrigatory={false}
                    styles={`w-fit`}
                >
                    <SelectField
                        name="credor"
                        id="credor"
                        required
                        styles={`w-fit`}
                        value={watch("credor")}
                        onForm={true}
                        register={register}
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {creditorsUnique.map((creditorUnique, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={creditorUnique.Id_Unique_Creditor}
                                    firstValue={creditorUnique.Creditor}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    label="ocorrence"
                    name="Ocorrência:"
                    obrigatory={false}
                    styles={`w-fit`}
                >
                    <SelectField
                        name="ocorrence"
                        id="ocorrence"
                        required
                        styles={`w-[200px]`}
                        onForm={true}
                        register={register}
                        value={watch("ocorrence")}
                    >
                        <Option value={"0"} firstValue={"Selecione"} />

                        {ocorrences.ocorrence.map((value, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={value.Id_Ocorrence}
                                    firstValue={value.Ocorrence}
                                />
                            )
                        })}

                    </SelectField>
                </FieldForm>
            </div>

            <div className="flex justify-center items-center">
                <div className={`flex gap-2`}>
                    <FieldForm
                        label="supervisor"
                        name="Supervisor:"
                        obrigatory={false}
                        styles={`w-fit`}
                    >
                        <SelectField
                            name="supervisor"
                            id="supervisor"
                            required
                            styles={`w-fit`}
                            onForm={true}
                            register={register}
                            value={watch("supervisor")}
                        >
                            <Option value={"0"} firstValue={"Selecione"} />

                            {supervisor.map((value, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={value.Id_User}
                                        firstValue={value.Name + " " + value.Last_Name}
                                    />
                                )
                            })}

                        </SelectField>
                    </FieldForm>

                    <FieldForm
                        label="feedback"
                        name="Feedback:"
                        obrigatory={false}
                        styles={`w-fit`}
                    >
                        <SelectField
                            name="feedback"
                            id="feedback"
                            styles={`w-fit`}
                            onForm={true}
                            register={register}
                            value={watch("feedback")}
                        >
                            <Option value={""} firstValue={"Selecione"} />
                            <Option
                                value={"responsable"}
                                firstValue={"Responsável do Feedback"}
                            />
                            <Option value={"N/A"} firstValue={"Sem Feedback"} />
                        </SelectField>
                    </FieldForm>
                </div>

                <Button
                    type="submit"
                    text="Filtrar"
                    disabled={disableAllButtons}
                    styles={`w-18 text-md h-11 ml-2 self-end`}
                />
                <input
                    type="reset"
                    value="Remover filtros"
                    disabled={!didFilter || disableAllButtons}
                    className={`h-11 w-18 self-end text-md font-medium ml-2 p-2 border border-red-400 text-red-500    rounded-md hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                    onClick={() => resetForm()}
                />
            </div>
        </form>
    )
}
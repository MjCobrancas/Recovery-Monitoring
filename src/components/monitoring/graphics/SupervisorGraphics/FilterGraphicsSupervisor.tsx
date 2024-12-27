import { getGraphicsSupervisors } from "@/api/monitoring/graphics/graphicsSupervisors/getGraphicsSupervisors";
import { getMonitoringGraphicsSupervisorsChartConfig } from "@/api/monitoring/graphics/graphicsSupervisors/getGraphicsSupervisorsChartConfig";
import { getMonitoringGraphicsSupervisor } from "@/api/monitoring/graphics/graphicsSupervisors/getMonitoringGraphicsSupervisor";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { IFilterGraphicsSupervisorData, IFilterGraphicsSupervisorProps, IFilterGraphicsSupervisorSchema } from "@/interfaces/monitoring/graphics/supervisor-graphics/IFilterGraphicsSupervisor";
import { getDateToday } from "@/utils/DateToday";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FilterGraphicsSupervisor({ graphicsSupervisorData, setValueGraphicsSupervisor, setValueGraphicsChartConfig, setValueCountCreditor }: IFilterGraphicsSupervisorProps) {

    const [foundSupervisors, setFoundSupervisors] = useState(false)
    const [didFilter, setDidFilter] = useState(false)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [checkAllSupervisors, setCheckAllSupervisors] = useState(false)

    const { control, register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<IFilterGraphicsSupervisorData>({
        defaultValues: {
            date_init: getDateToday(),
            date_end: getDateToday(),
            supervisors: []
        },
        resolver: zodResolver(IFilterGraphicsSupervisorSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "supervisors"
    })

    function removeFilters() {
        setCheckAllSupervisors(false)
        setDidFilter(false)
        setFoundSupervisors(false)
        setValueGraphicsSupervisor(null)
        reset()
        setValueGraphicsSupervisor(null)
        setValueGraphicsChartConfig(null)
        setValueCountCreditor(0)
    }

    function changeSupervisorStatus(status: boolean, index: number) {
        const object = fields

        object[index].Status = !status
        update(index, object[index])
    }
    
    function handleCheckAllSupervisors(checkAllSupervisors: boolean) {
        setCheckAllSupervisors(!checkAllSupervisors)
        const objectList = fields

        for (let i = 0; i < objectList.length; i++) {
            const item = objectList[i]

            item.Status = !checkAllSupervisors
        }

        setValue("supervisors", objectList)
    }

    async function handleGetSupervisors(data: FieldValues) {
        
        setDisableAllButtons(true)

        if (!foundSupervisors) {
            const responseData = await getGraphicsSupervisors(String(data.date_init), String(data.date_end))

            setDisableAllButtons(false)

            if (responseData.data == null || responseData.data.length == 0) {

                toast.error("Não foi possível encontrar supervisores com base nestes filtros, revise os valores e tente novamente!", {
                    duration: 7000
                })

                return
            }

            setFoundSupervisors(true)
            setDidFilter(true)

            setValue("supervisors", responseData.data)

            return
        }

        const id_backoffice: number[] = []

        for (let i = 0; i < data.supervisors.length; i++) {
            const supervisor = data.supervisors[i]

            if (supervisor.Status) {
                id_backoffice.push(supervisor.Id_Supervisor)
            }
        }

        const responseData = await getMonitoringGraphicsSupervisor(id_backoffice, String(data.date_init), String(data.date_end))

        if (responseData.data == null) {
            setDisableAllButtons(false)

            toast.error("Houve um erro ao buscar os dados de monitoria, revise os valores e tente novamente", {
                duration: 7000
            })

            return
        }

        const responseChartConfig = await getMonitoringGraphicsSupervisorsChartConfig(id_backoffice)

        setValueCountCreditor(0)

        setDisableAllButtons(false)

        setValueGraphicsChartConfig(responseChartConfig.data)

        toast.success("Filtro realizado com sucesso!", {
            duration: 7000
        })

        setValueGraphicsSupervisor(responseData.data)

    }

    return (
        <div
            className={classNames("flex flex-col justify-center items-center mx-4 py-10 border-x-[1px] border-t-[1px] rounded-t-lg", {
                "border-b-[1px] mb-10": graphicsSupervisorData == null
            })}
        >
            <h2 className="font-medium mb-10">Filtro dos gráficos</h2>

            <form
                className="w-full h-full flex flex-col justify-center items-center gap-4"
                onSubmit={handleSubmit(handleGetSupervisors)}
            >
                <div className="flex justify-center items-center gap-1">
                    <FieldForm
                        name="Data inicial:"
                        styles="w-fit"
                        error={errors.date_init && "Inválido"}
                    >
                        <Input
                            id="date_init"
                            name="date_init"
                            type="date"
                            onForm={true}
                            register={register}
                            value={watch("date_init")}
                            disabled={disableAllButtons || foundSupervisors}
                            styles={classNames("", {
                                "border-red-400": errors.date_init
                            })}
                        />
                    </FieldForm>

                    <FieldForm
                        name="Data final:"
                        styles="w-fit"
                        error={errors.date_end && "Inválido"}
                    >
                        <Input
                            id="date_end"
                            name="date_end"
                            type="date"
                            onForm={true}
                            register={register}
                            value={watch("date_end")}
                            disabled={disableAllButtons || foundSupervisors}
                            styles={classNames("", {
                                "border-red-400": errors.date_end
                            })}
                        />
                    </FieldForm>

                    {foundSupervisors ? (
                        <Button
                            text="Buscar"
                            styles="w-fit px-6 py-2 self-end"
                            disabled={disableAllButtons}
                        />
                    ) : (
                        <Button
                            text="Buscar supervisores"
                            styles="w-fit px-6 py-2 self-end"
                            disabled={disableAllButtons}
                        />
                    )}

                    <Button
                        type="button"
                        text="Remover filtros"
                        styles="w-fit px-6 py-2 border-red-400 text-red-400 hover:bg-red-400 focus:bg-red-400 self-end"
                        disabled={disableAllButtons || !didFilter}
                        OnClick={removeFilters}
                    />
                </div>
                {foundSupervisors && (
                    <div className="w-[400px] h-fit max-h-[300px] border-[1px] p-2 border-slate-200 rounded-md overflow-x-auto">
                        <div
                            className="flex justify-between items-center"
                        >
                            <h3 className="font-medium">Supervisores:</h3>
                            <div className="flex justify-center items-center gap-1">
                                <p>Marcar todos:</p>
                                <button
                                    type="button"
                                    className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                                        "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": checkAllSupervisors,
                                        "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !checkAllSupervisors
                                    })}
                                    onClick={() => handleCheckAllSupervisors(checkAllSupervisors)}
                                >
                                    {checkAllSupervisors && (
                                        <FontAwesomeIcon icon={faCheck} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {fields.map((item, index) => {
                            return (
                                <div
                                    className="my-4 flex justify-between items-center"
                                    key={index}
                                >
                                    <p>{item.Supervisor}</p>
                                    <button
                                        type="button"
                                        className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                                            "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": item.Status,
                                            "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !item.Status
                                        })}
                                        onClick={() => changeSupervisorStatus(item.Status, index)}
                                    >
                                        {item.Status && (
                                            <FontAwesomeIcon icon={faCheck} />
                                        )}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </form>
        </div>
    )

}

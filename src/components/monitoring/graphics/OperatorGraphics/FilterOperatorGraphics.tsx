import { getGraphicsOperators } from "@/api/monitoring/graphics/graphicsOperators/getGraphicsOperators";
import { getMonitoringGraphicsOperators } from "@/api/monitoring/graphics/graphicsOperators/getMonitoringGraphicsOperators";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFilterOperatorGraphicsData, IFilterOperatorGraphicsProps, IFilterOperatorGraphicsSchema } from "@/interfaces/monitoring/graphics/operators-graphics/IFilterOperatorGraphics";
import { getDateToday } from "@/utils/DateToday";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FilterOperatorGraphics({ creditorsUniqueList, graphicsOperators, setValueGraphicsOperators, handleSetCount }: IFilterOperatorGraphicsProps) {

    const { control, register, handleSubmit, watch, formState: { errors }, reset, setValue } = useForm<IFilterOperatorGraphicsData>({
        defaultValues: {
            id_creditor_unique: creditorsUniqueList.length > 0 ? String(creditorsUniqueList[0].Id_Unique_Creditor) : "0",
            date_init: getDateToday(),
            date_end: getDateToday(),
            operators: []
        },
        resolver: zodResolver(IFilterOperatorGraphicsSchema)
    })

    const { fields, update } = useFieldArray({
        control,
        name: "operators"
    })

    const [foundOperators, setFoundOperators] = useState(false)
    const [didFilter, setDidFilter] = useState(false)
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [checkAllOperators, setCheckAllOperators] = useState(false)

    function removeFilters() {
        reset()
        setValueGraphicsOperators(null)
        setDidFilter(false)
        setDisableAllButtons(false)
        setCheckAllOperators(false)
        setFoundOperators(false)
        handleSetCount(0, 0)
    }

    function changeOperatorStatus(status: boolean, index: number) {
        const object = fields
        object[index].Status = !status

        update(index, object[index])
    }

    function handleCheckAllOperators(status: boolean) {
        setCheckAllOperators(!status)
        const objectList = fields

        for (let i = 0; i < objectList.length; i++) {
            const item = objectList[i]

            item.Status = !status
        }

        setValue("operators", objectList)
    }

    async function handleGetOperators(data: FieldValues) {

        setDisableAllButtons(true)

        if (!foundOperators) {
            const responseData = await getGraphicsOperators(Number(data.id_creditor_unique), String(data.date_init), String(data.date_end))

            setDisableAllButtons(false)

            if (responseData.data == null || responseData.data.length == 0) {

                toast.error("Não foi possível encontrar os operadores baseados nestes filtros!", {
                    duration: 7000
                })

                return
            }

            setFoundOperators(true)
            setDidFilter(true)

            setValue("operators", responseData.data)

            return
        }

        const id_operators: number[] = []

        for (let i = 0; i < data.operators.length; i++) {
            const item = data.operators[i]

            if (item.Status) {
                id_operators.push(item.Id_User)
            }
        }

        if (id_operators.length == 0) {
            toast.error("É necessário que você selecione pelo menos um operador para utilizar este filtro!", {
                duration: 7000
            })

            setDisableAllButtons(false)

            return
        }

        const responseData = await getMonitoringGraphicsOperators(Number(data.id_creditor_unique), String(data.date_init), String(data.date_end), id_operators)

        setDisableAllButtons(false)

        if (responseData.data == null) {
            toast.error("Não foi possível buscar dados baseados nesses filtros verifique os valores e tente novamente!", {
                duration: 7000
            })

            return
        }

        handleSetCount(0, 0)
        setValueGraphicsOperators(responseData.data!)

        toast.success("Filtro realizado com sucesso!", {
            duration: 7000
        })

    }

    return (
        <div className={classNames("flex flex-col justify-center items-center mx-4 py-10 border-x-[1px] border-t-[1px] rounded-t-lg", {
            "border-b-[1px] mb-10": graphicsOperators == null
        })}>
            <h2 className="font-medium mb-10">Filtro dos gráficos</h2>

            <form
                className="w-full h-full flex flex-col justify-center items-center gap-4"
                onSubmit={handleSubmit(handleGetOperators)}
            >
                <div className="flex justify-center items-center gap-1">
                    <FieldForm
                        name="Credor:"
                        styles="w-fit"
                        error={errors.id_creditor_unique && "Inválido"}
                    >
                        <SelectField
                            id="id_creditor_unique"
                            name="id_creditor_unique"
                            disabled={disableAllButtons || foundOperators}
                            onForm={true}
                            register={register}
                            styles={classNames("", {
                                "border-red-400": errors.id_creditor_unique
                            })}
                        >
                            {creditorsUniqueList.map((creditorUnique, index) => {
                                return (
                                    <Option
                                        key={index}
                                        firstValue={creditorUnique.Creditor}
                                        value={creditorUnique.Id_Unique_Creditor}
                                    />
                                )
                            })}
                        </SelectField>
                    </FieldForm>
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
                            disabled={disableAllButtons || foundOperators}
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
                            disabled={disableAllButtons || foundOperators}
                            styles={classNames("", {
                                "border-red-400": errors.date_end
                            })}
                        />
                    </FieldForm>
                    {foundOperators ? (
                        <Button
                            text="Buscar"
                            styles="w-fit px-6 py-2 self-end"
                            disabled={disableAllButtons}
                        />
                    ) : (
                        <Button
                            text="Buscar operadores"
                            styles="w-fit px-6 py-2 self-end"
                            disabled={disableAllButtons}
                        />
                    )}

                    <Button
                        type="button"
                        text="Remover filtros"
                        styles="w-fit px-6 py-2 border-red-400 text-red-400 hover:bg-red-400 focus:bg-red-400 self-end"
                        disabled={!didFilter || disableAllButtons}
                        OnClick={removeFilters}
                    />
                </div>
                {foundOperators && (
                    <div className="w-[400px] h-fit max-h-[300px] border-[1px] p-2 border-slate-200 rounded-md overflow-x-auto">
                        <div
                            className="flex justify-between items-center"
                        >
                            <h3 className="font-medium">Operadores:</h3>
                            <div className="flex justify-center items-center gap-1">
                                <p>Marcar todos:</p>
                                <button
                                    type="button"
                                    className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                                        "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": checkAllOperators,
                                        "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !checkAllOperators
                                    })}
                                    onClick={() => handleCheckAllOperators(checkAllOperators)}
                                >
                                    {checkAllOperators && (
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
                                    <p>{item.Operator_Name}</p>
                                    <button
                                        type="button"
                                        className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                                            "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": item.Status,
                                            "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !item.Status
                                        })}
                                        onClick={() => changeOperatorStatus(item.Status, index)}
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

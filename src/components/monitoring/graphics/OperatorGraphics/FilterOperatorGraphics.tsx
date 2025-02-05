import { getGraphicsOperators } from "@/api/monitoring/graphics/graphicsOperators/getGraphicsOperators";
import { getMonitoringGraphicsOperators } from "@/api/monitoring/graphics/graphicsOperators/getMonitoringGraphicsOperators";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFilterOperatorGraphicsData, IFilterOperatorGraphicsProps, IFilterOperatorGraphicsSchema } from "@/interfaces/monitoring/graphics/operators-graphics/IFilterOperatorGraphics";
import { getDateToday } from "@/utils/DateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SelectOperators } from "./SelectOperators";

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
        <div className={classNames("flex flex-col justify-center items-center mx-4 py-10 border-x-[1px]", {
            "border-b-[1px] mb-10": graphicsOperators == null
        })}>
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

                    <SelectOperators 
                        operators={fields} 
                        handleCheckAllOperators={handleCheckAllOperators}
                        changeOperatorStatus={changeOperatorStatus}
                        checkAllOperators={checkAllOperators}
                        disableAllButtons={disableAllButtons}
                        foundOperators={foundOperators}
                    />

                    {foundOperators ? (
                        <Button
                            text="Buscar"
                            styles="w-fit px-4 py-3 text-sm self-end"
                            disabled={disableAllButtons}
                        />
                    ) : (
                        <Button
                            text="Buscar operadores"
                            styles="w-fit px-2 py-3 text-sm self-end"
                            disabled={disableAllButtons}
                        />
                    )}

                    <Button
                        type="button"
                        text="Remover filtros"
                        styles="w-fit text-sm px-4 py-3 border-red-400 text-red-400 hover:bg-red-400 focus:bg-red-400 self-end"
                        disabled={!didFilter || disableAllButtons}
                        OnClick={removeFilters}
                    />
                </div>
            </form>
        </div>
    )

}

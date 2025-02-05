import { getMonitoringGraphics } from "@/api/monitoring/graphics/getMonitoringGraphics";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFilterCreditorGraphics, IFilterCreditorGraphicsData, IFilterCreditorGraphicsSchema } from "@/interfaces/monitoring/graphics/creditor-graphics/IFilterCreditorGraphics";
import { getDateToday } from "@/utils/DateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FilterCreditorGraphics({ creditorsUniqueList, setValueGraphicsList, graphicsDefaultValue }: IFilterCreditorGraphics) {

    const [didFilter, setDidFilter] = useState(false)
    const [disableAllButtons, setDisableAllButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFilterCreditorGraphicsData>({
        defaultValues: {
            id_creditor_unique: creditorsUniqueList.length > 0 ? String(creditorsUniqueList[0].Id_Unique_Creditor) : "0",
            date_init: getDateToday(),
            date_end: getDateToday()
        },
        resolver: zodResolver(IFilterCreditorGraphicsSchema)
    })

    function removeFilter() {
        graphicsDefaultValue()
        setDidFilter(false)
        reset()
    }

    async function handleFilterCreditorGraphics(data: FieldValues) {
        setDisableAllButtons(true)

        const responseData = await getMonitoringGraphics(Number(data.id_creditor_unique), data.date_init, data.date_end)

        setDisableAllButtons(false)

        if (responseData.data == null) {
            toast.error("Não foi possível encontrar dados baseados nesses filtros!", {
                duration: 7000
            })

            return
        }

        setDidFilter(true)

        setValueGraphicsList(responseData.data!)

        toast.success("Filtro realizado com sucesso!", {
            duration: 7000
        })
    }

    return (
        <div className="flex flex-col justify-center items-center mx-4 py-10 border-x-[1px]">
            <form
                className="w-full h-full flex justify-center items-center gap-1"
                onSubmit={handleSubmit(handleFilterCreditorGraphics)}
            >
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
                        disabled={disableAllButtons}
                        onForm={true}
                        register={register}
                        value={watch("id_creditor_unique")}
                    >
                        {creditorsUniqueList.map((creditorUnique, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={String(creditorUnique.Id_Unique_Creditor)}
                                    firstValue={creditorUnique.Creditor}
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
                        styles={classNames("self-end py-[6px]", {
                            "border-red-500": errors.date_init
                        })}
                        disabled={disableAllButtons}
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
                        styles={classNames("self-end py-[6px]", {
                            "border-red-500": errors.date_end
                        })}
                        disabled={disableAllButtons}
                    />
                </FieldForm>
                <Button
                    text="Filtrar"
                    styles="ml-1 w-fit text-sm self-end px-6 py-[10px]"
                    disabled={disableAllButtons}
                />
                <Button
                    text="Remover filtros"
                    styles="w-fit self-end text-sm px-6 py-[10px] text-red-400 border-red-400 hover:bg-red-400 hover:text-white focus:bg-red-400"
                    disabled={!didFilter || disableAllButtons}
                    OnClick={removeFilter}
                />
            </form>
        </div>
    )

}

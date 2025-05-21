import { getGraphicsOperatorTotal } from "@/api/monitoring/graphics/graphicsOperators/getGraphicOperatorTotal";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFilterOperatorGraphicTotalData, IFilterOperatorGraphicTotalProps, IFilterOperatorGraphicTotalSchema } from "@/interfaces/monitoring/graphics/operator-graphic/IFilterOperatorGraphicTotal";
import { getDateToday } from "@/utils/DateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FilterOperatorGraphicTotal({ operatorGraphic, operators, setOperatorGraphic }: IFilterOperatorGraphicTotalProps) {

    const [didFilter, setDidFilter] = useState(false)
    const [disableButtons, setDisableButtons] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFilterOperatorGraphicTotalData>({
        defaultValues: {
            id_operator: "0",
            date_init: getDateToday(),
            date_end: getDateToday()
        },
        resolver: zodResolver(IFilterOperatorGraphicTotalSchema)
    })

    async function handleFilterOperatorGraphicTotal(data: IFilterOperatorGraphicTotalData) {
        setDisableButtons(true)

        const responseData = await getGraphicsOperatorTotal(Number(data.id_operator), data.date_init, data.date_end)

        setDisableButtons(false)

        if (responseData.data == null || responseData.data.length == 0) {
            toast.error("Não foi possível buscar dados baseados nesses filtros!", {
                duration: 7000
            })

            return
        }

        setDidFilter(true)

        setOperatorGraphic(responseData.data)

        toast.success("Filtro realizado com sucesso!", {
            duration: 5000
        })
    }

    function removeFilters() {
        setDidFilter(false)
        reset()
        setOperatorGraphic([])
    }

    return (
        <div className={classNames("flex flex-col justify-center items-center mx-4 py-10 border-x-[1px]", {
            "border-b-[1px]": operatorGraphic.length == 0
        })}>
            <form
                className="w-full h-full flex justify-center items-center gap-1"
                onSubmit={handleSubmit(handleFilterOperatorGraphicTotal)}
            >
                <FieldForm
                    name="Operador"
                    styles="w-fit min-w-[200px]"
                    error={errors.id_operator && "Inválido"}
                >
                    <SelectField
                        id="id_operator"
                        name="id_operator"
                        onForm={true}
                        register={register}
                        value={watch("id_operator")}
                        styles={classNames("", {
                            "border-red-400": errors.id_operator
                        })}
                        disabled={disableButtons}
                    >
                        <Option
                            value={"0"}
                            firstValue="Selecione"
                        />

                        {operators.map((operator) => {
                            return (
                                <Option
                                    key={operator.Id_User}
                                    value={operator.Id_User}
                                    firstValue={`${operator.Name} ${operator.Last_Name}`}
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
                        styles={classNames("", {
                            "border-red-400": errors.date_init
                        })}
                        disabled={disableButtons}
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
                        styles={classNames("", {
                            "border-red-400": errors.date_end
                        })}
                        disabled={disableButtons}
                    />
                </FieldForm>

                <Button
                    styles="w-fit px-4 py-3 text-sm self-end"
                    text="Buscar"
                    disabled={disableButtons}
                />

                <Button
                    styles="w-fit px-4 py-3 text-sm self-end text-red-400 border-red-400 hover:bg-red-400 focus:bg-red-400"
                    text="Remover filtros"
                    disabled={disableButtons || !didFilter}
                    OnClick={removeFilters}
                />
            </form>
        </div>
    )

}
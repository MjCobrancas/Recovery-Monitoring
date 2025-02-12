import { getMonitoringFeedbacks } from "@/api/monitoring/feedback/getMonitoringFeedbacks";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IFilterFeedbackListData, IFilterFeedbackListProps, IFilterFeedbackListSchema } from "@/interfaces/monitoring/feedback/container-feedback-list/filter/IFilterFeedbackList";
import { getDateToday } from "@/utils/DateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function FilterFeedbackList({ responsables, operators, setFeedbackIndex, setFeedbacksList }: IFilterFeedbackListProps) {

    const [disableButtons, setDisableButtons] = useState(false)
    const [didFilter, setDidFilter] = useState(false)

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<IFilterFeedbackListData>({
        defaultValues: {
            id_operator: "0",
            id_responsable: "0",
            date_init: getDateToday(),
            date_end: getDateToday()
        },
        resolver: zodResolver(IFilterFeedbackListSchema)
    })

    async function handleFilterFeedbackList(data: FieldValues) {

        setDisableButtons(true)

        const responseData = await getMonitoringFeedbacks(data.date_init, data.date_end, Number(data.id_operator), Number(data.id_responsable))

        setDisableButtons(false)

        if (responseData.length <= 0) {
            toast.error("Não foi possível buscar dados baseados nesses filtros!", {
                duration: 7000
            })

            return
        }

        toast.success("Filtro realizado com sucesso!", {
            duration: 5000
        })

        setDidFilter(true)

        setFeedbackIndex(0)
        setFeedbacksList(responseData)
    }

    async function removeFilters() {
        setDidFilter(false)
        setFeedbackIndex(0)

        const data = await getMonitoringFeedbacks(getDateToday(), getDateToday())

        setFeedbacksList(data)
        reset()
    }

    return (
        <form
            className="flex flex-col justify-center items-center gap-5 mx-2 mb-5 p-2 border-[1px] border-slate-200 rounded-md dark:border-zinc-700"
            onSubmit={handleSubmit(handleFilterFeedbackList)}
        >
            <div className="flex justify-center items-center gap-1">
                <FieldForm
                    name="Responsável:"
                    styles="w-fit"
                    error={errors.id_responsable && "Inválido"}
                    obrigatory={false}
                >
                    <SelectField
                        id="id_responsable"
                        name="id_responsable"
                        styles={classNames("w-fit", {
                            "border-red-400": errors.id_responsable
                        })}
                        onForm={true}
                        register={register}
                        value={watch("id_responsable")}
                        disabled={disableButtons}
                    >
                        <Option value={"0"} firstValue="Selecione um responsável" />

                        {responsables.map((responsable, index) => {
                            return (
                                <Option
                                    key={index}
                                    value={responsable.Id_User}
                                    firstValue={`${responsable.Name} ${responsable.Last_Name}`}
                                />
                            )
                        })}
                    </SelectField>
                </FieldForm>

                <FieldForm
                    name="Operador:"
                    styles="w-fit"
                    error={errors.id_operator && "Inválido"}
                    obrigatory={false}
                >
                    <SelectField
                        id="id_operator"
                        name="id_operator"
                        styles={classNames("w-fit", {
                            "border-red-400": errors.id_operator
                        })}
                        onForm={true}
                        register={register}
                        value={watch("id_operator")}
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
            </div>

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
                    text="Buscar"
                    styles="w-fit text-sm py-3 self-end"
                    disabled={disableButtons}
                />

                <Button
                    text="Remover filtros"
                    type="button"
                    styles="w-fit text-sm py-3 self-end text-red-400 border-red-400 hover:bg-red-400 focus:bg-red-400"
                    disabled={disableButtons || !didFilter}
                    OnClick={removeFilters}
                />
            </div>

        </form>
    )

}

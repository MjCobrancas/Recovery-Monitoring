import { verifyUserToken } from "@/api/generics/verifyToken";
import { saveMonitoryFeedback } from "@/api/monitoring/realized/saveMonitoryFeedback";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IDialogCreateFeedbackProps, IDialogCreateFormSchema } from "@/interfaces/monitoring/realized/IDialogCreateFeedback";
import { getDateToday } from "@/utils/DateToday";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function DialogCreateFeedback({ userFeedbackIndex, feedbackInfo, backOffices, closeDialogFeedback, disableAllButtons, setValueDisableButtons, setValueReloadTable }: IDialogCreateFeedbackProps) {

    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors }, clearErrors, reset } = useForm<{ responsable: string }>({
        defaultValues: {
            responsable: backOffices.length > 0 ? String(backOffices[0].Id_User) : "0"
        },
        resolver: zodResolver(IDialogCreateFormSchema)
    })

    async function handleCreateFeedback(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setValueDisableButtons(true)
        
        const saveMonitoryStatus = await saveMonitoryFeedback(feedbackInfo!.Id_Form, Number(backOffices.length > 0 ? Number(backOffices[0].Id_User) : 0))

        setValueDisableButtons(false)

        if (!saveMonitoryStatus.status) {
            toast.error("Houve um erro para cadastrar o feedback, revise os valores e tente novamente", {
                duration: 5000
            })

            return
        }

        toast.success("Feedback cadastrado com sucesso!", {
            duration: 5000
        })
        
        setValueReloadTable(true)
        reset()
        closeDialogFeedback()
    }

    return (
        <>
            <h2
                className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
            >
                Adicionar Feedback Monitoria {feedbackInfo?.Id_Form}
            </h2>

            {userFeedbackIndex != -1 ? (
                <>
                    <table className="w-full mx-auto my-4">
                        <thead className="bg-gray-200 dark:bg-zinc-900">
                            <tr>
                                <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md">
                                    Negociador
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">Avaliador</th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Nota de Negociação
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Nota de Comportamento
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">Credor</th>
                                <th className="font-semibold p-2 dark:text-white/80">Ocorrência</th>
                                <th className="font-semibold p-2 dark:text-white/80">Fase</th>
                                <th className="font-semibold p-2 dark:text-white/80 rounded-tr-md">
                                    Data da Monitoria
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800 dark:text-white"
                            >
                                <td className="p-2 text-center">
                                    {`${feedbackInfo?.Name} ${feedbackInfo?.Last_Name}`}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Evaluator_Name}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Grade_Value}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Grade_Value_Behavioral}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Creditor}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Ocorrence}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Description}
                                </td>
                                <td className="p-2 text-center">
                                    {feedbackInfo?.Date}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <form onSubmit={handleSubmit(handleCreateFeedback)}>
                        <div className="w-full flex justify-center items-center gap-2 my-5">
                            <FieldForm label="date" name="Data:" obrigatory={false} styles="w-fit">
                                <Input
                                    value={getDateToday()}
                                    type="date"
                                    id="date"
                                    name="date"
                                    disabled
                                    required
                                />
                            </FieldForm>

                            <FieldForm
                                label="Responsable"
                                name="Responsável"
                                styles="w-fit"
                                error={errors.responsable && "Inválido"}
                            >
                                <SelectField 
                                    id="responsable" 
                                    name="responsable" 
                                    styles={`w-fit ${errors.responsable ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}`}
                                    onForm={true}
                                    register={register}
                                    value={watch("responsable")}
                                    disabled={true}
                                >
                                    { backOffices.length > 0 ? backOffices.map((item, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={item.Id_User}
                                                firstValue={`${item.Name} ${item.Last_Name}`}
                                            />
                                        )
                                    }) : (
                                        <Option 
                                            value={"0"}
                                            firstValue="Selecione"
                                        />
                                    )}
                                </SelectField>
                            </FieldForm>
                        </div>

                        <div className="flex justify-end items-center">
                            <button
                                type="button"
                                disabled={disableAllButtons}
                                className={`h-11 w-18 text-md font-medium ml-2 p-2 border border-red-400 text-red-500    rounded-md hover:bg-red-400 hover:text-white duration-200 cursor-pointer disabled:bg-slate-300 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-100 dark:disabled:bg-slate-500 dark:disabled:text-gray-200`}
                                onClick={() => {reset(); clearErrors(); closeDialogFeedback()}}
                            >
                                Cancelar
                            </button>

                            <Button
                                type="submit"
                                name="idForm"
                                text="Salvar alterações"
                                disabled={disableAllButtons}
                                styles={`w-18 text-md h-11 ml-2`}
                            />
                        </div>
                    </form>
                </>
            ) : (
                <p className="font-bold">Não foi possível encontrar a monitoria do operador</p>
            )}
        </>
    )
}
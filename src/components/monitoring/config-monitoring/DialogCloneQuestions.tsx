import { verifyUserToken } from "@/api/generics/verifyToken"
import { deleteQuestions } from "@/api/monitoring/config-monitoring/deleteQuestions"
import { getAgingByCreditorAndOcorrence } from "@/api/monitoring/config-monitoring/getAgingByCreditorAndOcorrence"
import { getCreditorRelationWithCreditorUnique } from "@/api/monitoring/config-monitoring/getCreditorRelationWithCreditorUnique"
import { getOcorrencesByCreditor } from "@/api/monitoring/config-monitoring/getOcorrencesByCreditor"
import { saveOptionsAndQuestions } from "@/api/monitoring/config-monitoring/saveOptionsAndQuestions"
import { Button } from "@/components/Button"
import { FieldForm } from "@/components/FieldForm"
import { Option } from "@/components/Option"
import { SelectField } from "@/components/SelectField"
import { IAgings } from "@/interfaces/generics/IAgings"
import { ICreditorsUnique } from "@/interfaces/generics/ICreditorsUnique"
import { IDialogCloneQuestionsProps } from "@/interfaces/monitoring/config-monitoring/IDialogCloneQuestions"
import { IHeaderSelectConfigForm, IHeaderSelectConfigSchema } from "@/interfaces/monitoring/config-monitoring/IHeaderSelectConfig"
import { zodResolver } from "@hookform/resolvers/zod"
import classNames from "classnames"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import toast from "react-hot-toast"

export function DialogCloneQuestions({ questionsList, dialogCloneQuestions, headerObject, creditors }: IDialogCloneQuestionsProps) {

    const router = useRouter()

    const [creditorsUnique, setCreditorsUnique] = useState<ICreditorsUnique[]>([])
    const [ocorrences, setOcorrences] = useState<{ Id_Ocorrence: number, Ocorrence: string }[]>([])
    const [agings, setAgings] = useState<IAgings[]>([])
    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [notFoundMessage, setNotFoundMessage] = useState("")

    const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues } = useForm<IHeaderSelectConfigForm>({
        defaultValues: {
            id_creditor: "0",
            id_creditor_unique: "disabled",
            id_ocorrence: "disabled",
            id_aging: "disabled"
        },
        resolver: zodResolver(IHeaderSelectConfigSchema)
    })

    async function handleCloneQuestions(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setNotFoundMessage("")
        setDisableAllButtons(true)

        if (data.id_aging != "disabled") {

            if (headerObject.id_creditor_unique == Number(data.id_creditor_unique) && headerObject.id_ocorrence == Number(data.id_ocorrence) && headerObject.id_aging == Number(data.id_aging)) {
                toast.error("Não é possível clonar os mesmos valores de credor, ocorrência e fase que você selecionou no cabeçário da configuração de monitoria!", {
                    duration: 5000
                })

                setDisableAllButtons(false)

                return
            }

            if (questionsList.questions.length <= 0 || questionsList.behavioral.length <= 0) {

                toast.error("Não é possível clonar perguntas de um credor/ocorrência/fase que não possui perguntas!", {
                    duration: 5000
                })

                setDisableAllButtons(false)

                return
            }

            const questionsAll = [...questionsList.questions, ...questionsList.behavioral]
            const questions = []

            for (let i = 0; i < questionsAll.length; i++) {
                const item = questionsAll[i]
                questions.push({
                    idQuestion: Number(item.idQuestion),
                    note: Number(item.note),
                    position: Number(i + 1),
                    isBehavioral: Boolean(item.isBehavioral)
                })
            }

            const object = {
                idCreditorUnique: Number(data.id_creditor_unique),
                idOcorrence: Number(data.id_ocorrence),
                idAging: Number(data.id_aging),
                questions
            }

            const deleteQuestionsStatus = await deleteQuestions({ id_creditor_unique: Number(data.id_creditor_unique), id_ocorrence: Number(data.id_ocorrence), id_aging: Number(data.id_aging) })

            if (!deleteQuestionsStatus) {
                toast.error("Houve um erro ao clonar as perguntas da monitoria, revise os valores e tente novamente!", {
                    duration: 5000
                })

                setDisableAllButtons(false)

                return
            }

            const setMonitoryStatus = await saveOptionsAndQuestions<typeof object>(object)

            setDisableAllButtons(false)

            if (!setMonitoryStatus) {
                toast.error("Houve um erro ao clonar as perguntas da monitoria, revise os valores e tente novamente!", {
                    duration: 5000
                })

                return
            }

            toast.success("As perguntas foram clonadas com sucesso!", {
                duration: 5000
            })

            reset()

            dialogCloneQuestions.current?.close()

            return
        }

        if (data.id_ocorrence != "disabled") {
            const getAgings = await getAgingByCreditorAndOcorrence(Number(data.id_creditor), Number(data.id_ocorrence))

            setDisableAllButtons(false)

            if (!getAgings.status) {
                setNotFoundMessage("agings")

                return
            }

            setAgings(getAgings.data)
            setValue("id_aging", "0")

            return
        }

        if (data.id_creditor_unique != "disabled") {
            const getOcorrences = await getOcorrencesByCreditor(Number(data.id_creditor))

            setDisableAllButtons(false)

            if (!getOcorrences.status) {
                setNotFoundMessage("ocorrences")

                return
            }

            setOcorrences(getOcorrences.data)
            setValue("id_ocorrence", "0")

            return
        }

        const getCreditorUnique = await getCreditorRelationWithCreditorUnique(Number(data.id_creditor))

        setDisableAllButtons(false)

        if (!getCreditorUnique.status) {
            setNotFoundMessage("creditor_unique")

            return
        }

        setCreditorsUnique(getCreditorUnique.data)
        if (getCreditorUnique.data.length == 1) {
            const creditor = getCreditorUnique.data[0]

            setValue("id_creditor_unique", String(creditor.Id_Unique_Creditor))

            return
        }
        setValue("id_creditor_unique", "0")
    }

    function changedCreditors() {
        setValue("id_creditor_unique", "disabled")
        setValue("id_ocorrence", "disabled")
        setValue("id_aging", "disabled")
        setOcorrences([])
        setAgings([])
    }

    function changedOcorrences() {
        setValue("id_aging", "disabled")
        setAgings([])
    }

    function closeDialog() {
        reset()
        dialogCloneQuestions.current?.close()
        setCreditorsUnique([])
        setOcorrences([])
        setAgings([])
    }

    return (
        <>
            <h2 className="text-2xl text-center text-slate-500 dark:text-slate-100 font-bold ">Clonar questões para outro Credor</h2>
            <form
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit(handleCloneQuestions)}
            >
                <div className="flex justify-center items-center my-10 gap-2">
                    <FieldForm label="team" name="Equipe:" obrigatory={false} error={errors.id_creditor && "Inválido"}>
                        <SelectField
                            name="id_creditor"
                            id="credor"
                            OnChange={() => changedCreditors()}
                            required
                            onForm={true}
                            register={register}
                            value={watch("id_creditor")}
                            styles={errors.id_creditor ? "border-red-500" : ""}
                            disabled={disableAllButtons}
                        >
                            <Option value={"0"} firstValue={"Selecione um credor"} />
                            {creditors.map((creditor, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={creditor.Id_Creditor}
                                        firstValue={creditor.Creditor}

                                    />
                                )
                            })}
                        </SelectField>
                    </FieldForm>

                    <FieldForm label="creditor_unique" name="Credor:" obrigatory={false} error={errors.id_creditor_unique && "Inválido"}>
                        <SelectField
                            name="id_creditor_unique"
                            id="id_creditor_unique"
                            styles={classNames("w-fit min-w-full", {
                                "border-red-500": errors.id_creditor_unique
                            })}
                            required
                            disabled={creditorsUnique.length == 0 || disableAllButtons}
                            onForm={true}
                            register={register}
                            value={watch("id_creditor_unique")}
                        >
                            {getValues("id_creditor_unique") == "disabled" ? (
                                <Option value={"disabled"} firstValue="Selecione um credor" />
                            ) : (
                                <>
                                    {creditorsUnique.length > 1 && <Option value="0" firstValue="Selecione um credor" />}

                                    {creditorsUnique.length > 1 ? creditorsUnique.map((creditorUnique, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={creditorUnique.Id_Unique_Creditor}
                                                firstValue={creditorUnique.Creditor}
                                            />
                                        )
                                    }) : (
                                        <>
                                            {creditorsUnique.length == 1 && (
                                                <Option
                                                    value={creditorsUnique[0].Id_Unique_Creditor}
                                                    firstValue={creditorsUnique[0].Creditor}
                                                />
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </SelectField>
                    </FieldForm>

                    <FieldForm label="ocorrences" name="Ocorrência:" obrigatory={false} error={errors.id_ocorrence && "Inválido"}>
                        <SelectField
                            name="id_ocorrence"
                            id="ocorrences"
                            styles={`w-fit min-w-full ${errors.id_ocorrence && "border-red-500"}`}
                            required
                            OnChange={() => changedOcorrences()}
                            disabled={ocorrences.length == 0 || disableAllButtons}
                            onForm={true}
                            register={register}
                            value={watch("id_ocorrence")}
                        >
                            {getValues("id_ocorrence") == "disabled" ? (
                                <Option value="disabled" firstValue="Selecione uma ocorrência" />
                            ) : (
                                <>
                                    <Option value={"0"} firstValue={"Selecione uma ocorrência"} />

                                    {ocorrences.map((ocorrence, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={ocorrence.Id_Ocorrence}
                                                firstValue={ocorrence.Ocorrence}
                                            />
                                        )
                                    })}
                                </>
                            )}

                        </SelectField>
                    </FieldForm>

                    <FieldForm label="fase" name="Fase:" obrigatory={false} error={errors.id_aging && "Inválido"}>
                        <SelectField
                            name="id_aging"
                            id="fase"
                            styles={`w-fit min-w-full ${errors.id_aging && "border-red-500"}`}
                            disabled={agings.length == 0 || disableAllButtons}
                            onForm={true}
                            value={watch("id_aging")}
                            register={register}
                        >
                            {getValues("id_aging") == "disabled" ? (
                                <Option value={"disabled"} firstValue="Selecione uma fase" />
                            ) : (
                                <>
                                    <Option value={"0"} firstValue="Selecione uma fase" />

                                    {agings.map((aging, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={aging.Id_Aging}
                                                firstValue={aging.Description}
                                            />
                                        )
                                    })}
                                </>
                            )}
                        </SelectField>
                    </FieldForm>

                    <Button
                        styles="w-fit px-4 py-[5px] self-end"
                        text="Buscar"
                        disabled={disableAllButtons || agings.length > 0}
                    />
                </div>
                {notFoundMessage != "" && (
                    <div className={`w-[80%] p-2 bg-red-400 rounded-md`}>

                        {notFoundMessage == "creditor_unique" && (
                            <p className="text-white font-medium">
                                Não foi possível encontrar os credores
                            </p>
                        )}

                        {notFoundMessage == "ocorrences" && (
                            <p className={`text-white font-medium`}>
                                Não foi possível trazer as ocorrências
                            </p>
                        )}

                        {notFoundMessage == "agings" && (
                            <p className={`text-white font-medium`}>
                                Não foi possível trazer as fases
                            </p>
                        )}

                        {notFoundMessage == "questions" && (
                            <p className={`text-white font-medium`}>
                                Não foi possível trazer as perguntas
                            </p>
                        )}
                    </div>
                )}
                <div className="flex justify-center items-center self-end gap-2 mt-20">
                    <Button
                        type="button"
                        styles="w-fit px-4 py-1 text-red-500 border-red-500 hover:bg-red-500 focus:bg-red-500"
                        text="Fechar"
                        OnClick={() => closeDialog()}
                    />
                    <Button
                        styles="w-fit px-4 py-1"
                        text="Clonar perguntas"
                        disabled={agings.length == 0 || disableAllButtons}
                    />
                </div>
            </form>
        </>
    )
}
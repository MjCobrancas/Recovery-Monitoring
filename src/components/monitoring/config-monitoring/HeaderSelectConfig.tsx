import { verifyUserToken } from "@/api/generics/verifyToken";
import { getAgingByCreditorAndOcorrence } from "@/api/monitoring/config-monitoring/getAgingByCreditorAndOcorrence";
import { getCreditorRelationWithCreditorUnique } from "@/api/monitoring/config-monitoring/getCreditorRelationWithCreditorUnique";
import { getOcorrencesByCreditor } from "@/api/monitoring/config-monitoring/getOcorrencesByCreditor";
import { getRelationQuestions } from "@/api/monitoring/config-monitoring/getRelationQuestions";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IResultDefaultResponse } from "@/interfaces/Generics";
import { IAgings } from "@/interfaces/generics/IAgings";
import { IHeaderSelectConfigForm, IHeaderSelectConfigProps, IHeaderSelectConfigSchema, IQuestionsResponse } from "@/interfaces/monitoring/config-monitoring/IHeaderSelectConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export function HeaderSelectConfig({ creditors, setValueQuestionList, setValuesHeader, setValueDisableAllButtons, disableAllButtons }: IHeaderSelectConfigProps) {

    const router = useRouter()

    const [creditorsUnique, setCreditorsUnique] = useState<{ Id_Unique_Creditor: number, Creditor: string }[]>([])
    const [ocorrences, setOcorrences] = useState<{ Id_Ocorrence: number, Ocorrence: string }[]>([])
    const [agings, setAgings] = useState<IAgings[]>([])
    const [notFoundMessage, setNotFoundMessage] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    const { register, handleSubmit, watch, formState: { errors }, getValues, setValue } = useForm<IHeaderSelectConfigForm>({
        defaultValues: {
            id_creditor: "0",
            id_creditor_unique: "disabled",
            id_ocorrence: "disabled",
            id_aging: "disabled"
        },
        resolver: zodResolver(IHeaderSelectConfigSchema)
    })

    async function handleGetRelations(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setNotFoundMessage("")
        setDisableButton(true)
        setValueDisableAllButtons(true)

        if (data.id_aging != "disabled") {
            const configObject = {
                creditor: Number(data.id_creditor_unique),
                ocorrence: Number(data.id_ocorrence),
                fase: Number(data.id_aging)
            }

            const getQuestions: IResultDefaultResponse<IQuestionsResponse | null> = await getRelationQuestions<typeof configObject>(configObject)

            setDisableButton(false)
            setValueDisableAllButtons(false)

            if (!getQuestions.status) {
                setNotFoundMessage("questions")

                return
            }

            setValueQuestionList(getQuestions.data!, true)

            setValuesHeader(Number(data.id_creditor), Number(data.id_creditor_unique), Number(data.id_ocorrence), Number(data.id_aging))

            return
        }

        if (data.id_ocorrence != "disabled") {
            const getAgings = await getAgingByCreditorAndOcorrence(Number(data.id_creditor), Number(data.id_ocorrence))

            setDisableButton(false)
            setValueDisableAllButtons(false)

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

            setDisableButton(false)
            setValueDisableAllButtons(false)

            if (!getOcorrences.status) {
                setNotFoundMessage("ocorrences")

                return
            }

            setOcorrences(getOcorrences.data)
            setValue("id_ocorrence", "0")

            return
        }

        const getCreditorUnique = await getCreditorRelationWithCreditorUnique(Number(data.id_creditor))

        setDisableButton(false)
        setValueDisableAllButtons(false)

        if (!getCreditorUnique.status) {
            setNotFoundMessage("creditor_unique")

            return
        }

        setCreditorsUnique(getCreditorUnique.data)
        setValue("id_creditor_unique", "0")
    }

    function changedCreditors() {
        setValue("id_creditor_unique", "disabled")
        setValue("id_ocorrence", "disabled")
        setValue("id_aging", "disabled")
        setCreditorsUnique([])
        setOcorrences([])
        setAgings([])
        setValuesHeader(0, 0, 0, 0)
        setValueQuestionList({ generic: [], questions: [], behavioral: [] }, false)
    }

    function changedCreditorsUnique() {
        setValue("id_ocorrence", "disabled")
        setValue("id_aging", "disabled")
        setOcorrences([])
        setAgings([])
        setValuesHeader(0, 0, 0, 0)
        setValueQuestionList({ generic: [], questions: [], behavioral: [] }, false)
    }

    function changedOcorrences() {
        setValue("id_aging", "disabled")
        setAgings([])
        setValuesHeader(0, 0, 0, 0)
        setValueQuestionList({ generic: [], questions: [], behavioral: [] }, false)
    }

    function changedAgings() {
        setValuesHeader(0, 0, 0, 0)
        setValueQuestionList({ generic: [], questions: [], behavioral: [] }, false)
    }

    return (
        <section className={`flex items-end justify-center gap-2 mb-8 mx-28`}>
            <div className={`flex flex-col gap-2`}>
                <form
                    className={`flex items-end gap-2`}
                    onSubmit={handleSubmit(handleGetRelations)}
                >
                    <FieldForm label="credor" name="Equipe:" obrigatory={false} error={errors.id_creditor && "Inválido"}>
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
                            <Option value={"0"} firstValue={"Selecione uma equipe"} />
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

                    <FieldForm label="creditor" name="Credor:" obrigatory={false} error={errors.id_creditor_unique ? "Inválido" : ""}>
                        <SelectField
                            name="id_creditor_unique"
                            id="id_creditor_unique"
                            styles={classNames("w-fit min-w-full", {
                                "border-red-500": errors.id_creditor_unique
                            })}
                            required
                            onForm={true}
                            register={register}
                            value={watch("id_creditor_unique")}
                            disabled={creditorsUnique.length == 0 || disableAllButtons}
                            OnChange={changedCreditorsUnique}
                        >
                            {getValues("id_creditor_unique") == "disabled" ? (
                                <Option value="disabled" firstValue="Selecione um credor" />
                            ) : (
                                <>
                                    {creditorsUnique.length > 1 && <Option value={"0"} firstValue="Selecione um credor" />}

                                    {creditorsUnique.length > 1 ? creditorsUnique.map((creditor_unique, index) => {
                                        return (
                                            <Option
                                                key={index}
                                                value={creditor_unique.Id_Unique_Creditor}
                                                firstValue={creditor_unique.Creditor}
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
                            OnChange={() => changedAgings()}
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
                        type="submit"
                        text="Buscar"
                        styles={`w-24 h-10 text-md`}
                        disabled={disableButton || disableAllButtons}
                    />
                </form>

                {notFoundMessage != "" && (
                    <div className={`p-2 bg-red-400 rounded-md`}>

                        {notFoundMessage == "creditor_unique" && (
                            <p className="text-white font-medium">
                                Não foi possível trazer os credores
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
            </div>
        </section>
    )
}

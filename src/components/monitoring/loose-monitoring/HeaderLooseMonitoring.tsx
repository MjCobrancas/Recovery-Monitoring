'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { getMonitoringQuestions } from "@/api/monitoring/answer-monitoring/getMonitoringQuestions";
import { getCreditorRelationWithAgingsLooseMonitoring } from "@/api/monitoring/config-monitoring/creditor-relation-loose-monitoring/getCreditorRelationWithAgingLooseMonitoring";
import { getCreditorRelationWithOcorrenceLooseMonitoring } from "@/api/monitoring/config-monitoring/creditor-relation-loose-monitoring/getCreditorRelationWithOcorrenceLooseMonitoring";
import { getCreditorRelationWithCreditorUnique } from "@/api/monitoring/config-monitoring/getCreditorRelationWithCreditorUnique";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IAgings } from "@/interfaces/generics/IAgings";
import { ILooseHeaderConfigData, ILooseHeaderConfigSchema, ILooseMonitoringHeader, ILooseMonitoringHeaderInfo } from "@/interfaces/monitoring/loose-monitoring/ILooseMonitoring";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TableLooseMonitoring from "./TableLooseMonitoring";
import { ISupervisors } from "@/interfaces/generics/ISupervisors";
import { getAllSupervisors } from "@/api/generics/getAllSupervisors";

export function HeaderLooseMonitoring({ creditors, setValueQuestionList, questions, operators }: ILooseMonitoringHeader) {

    const router = useRouter()

    const [creditorsUnique, setCreditorsUnique] = useState<{ Id_Unique_Creditor: number, Creditor: string }[]>([])
    const [ocorrences, setOcorrences] = useState<{ Id_Ocorrence: number, Ocorrence: string }[]>([])
    const [agings, setAgings] = useState<IAgings[]>([])
    const [responsableList, setResponsableList] = useState<ISupervisors[]>([])
    const [notFoundMessage, setNotFoundMessage] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    const [headerInfo, setHeaderInfo] = useState<ILooseMonitoringHeaderInfo>({ creditor: "", creditorUnique: "", ocorrence: "", phase: "" })
    const { register, handleSubmit, watch, formState: { errors }, getValues, setValue } = useForm<ILooseHeaderConfigData>({
        defaultValues: {
            creditor: "0",
            creditorUnique: "disabled",
            ocorrence: "disabled",
            phase: "disabled"
        },
        resolver: zodResolver(ILooseHeaderConfigSchema)
    })

    async function handleGetRelations(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setNotFoundMessage("")
        setDisableButton(true)

        if (data.phase != "disabled") {
            const configObject = [
                {
                    Id_Creditor: Number(data.creditor),
                    Id_Creditor_Unique: Number(data.creditorUnique),
                    Id_Ocorrence: Number(data.ocorrence),
                    Id_Aging: Number(data.phase)
                }
            ]

            setHeaderInfo({
                creditor: String(data.creditor),
                creditorUnique: String(data.creditorUnique),
                ocorrence: String(data.ocorrence),
                phase: String(data.phase)
            }) 

            const getQuestions = await getMonitoringQuestions(configObject)

            setDisableButton(false)

            if (!getQuestions.status) {

                toast.error("Houve um erro ao buscar as perguntas da monitoria, tente novamente mais tarde.", {
                    duration: 7000
                })

                return
            }

            if (getQuestions.data!.questions.length <= 0 && getQuestions.data!.behavioral.length <= 0) {
                setNotFoundMessage("questions")

                return
            }

            const responsables = await getAllSupervisors(Number(data.creditor) == 58 ? 18 : Number(data.creditorUnique))

            setResponsableList(responsables)

            setValueQuestionList(getQuestions.data!)

            return
        }

        if (data.ocorrence != "disabled") {
            const getAgings = await getCreditorRelationWithAgingsLooseMonitoring(Number(data.creditorUnique), Number(data.ocorrence))

            setDisableButton(false)

            if (!getAgings.status) {
                setNotFoundMessage("agings")

                return
            }

            setAgings(getAgings.data)
            setValue("phase", "0")

            return
        }

        if (data.creditorUnique != "disabled") {
            const getOcorrences = await getCreditorRelationWithOcorrenceLooseMonitoring(Number(data.creditor), Number(data.creditorUnique))

            setDisableButton(false)

            if (!getOcorrences.status) {
                setNotFoundMessage("ocorrences")

                return
            }

            setOcorrences(getOcorrences.data)
            setValue("ocorrence", "0")

            return
        }

        const getCreditorUnique = await getCreditorRelationWithCreditorUnique(Number(data.creditor))

        setDisableButton(false)

        if (!getCreditorUnique.status) {
            setNotFoundMessage("creditorUnique")

            return
        }

        setCreditorsUnique(getCreditorUnique.data)

        if (getCreditorUnique.data.length == 1) {
            setValue("creditorUnique", String(getCreditorUnique.data[0].Id_Unique_Creditor))

            return
        }

        setValue("creditorUnique", "0")
    }

    function changedCreditors() {
        setValue("creditorUnique", "disabled")
        setValue("ocorrence", "disabled")
        setValue("phase", "disabled")
        setCreditorsUnique([])
        setOcorrences([])
        setAgings([])
        setValueQuestionList({ questions: [], behavioral: [] })
    }

    function changedCreditorUnique() {
        setValue("ocorrence", "disabled")
        setValue("phase", "disabled")
        setOcorrences([])
        setAgings([])
        setValueQuestionList({ questions: [], behavioral: [] })
    }

    function changedOcorrences() {
        setValue("phase", "disabled")
        setAgings([])
        setValueQuestionList({ questions: [], behavioral: [] })
    }

    function changedPhases() {
        setValueQuestionList({ questions: [], behavioral: [] })
    }

    return (
        <>
            <section className={`flex items-end justify-center gap-2 mb-8 mx-28`}>
                <div className={`flex flex-col gap-2`}>
                    <form
                        className={`flex items-end gap-2`}
                        onSubmit={handleSubmit(handleGetRelations)}
                    >
                        <FieldForm label="equipe" name="Equipe:" obrigatory={false} error={errors.creditor && "Inválido"}>
                            <SelectField
                                name="creditor"
                                id="creditor"
                                OnChange={() => changedCreditors()}
                                required
                                onForm={true}
                                register={register}
                                value={watch("creditor")}
                                styles={errors.creditor ? "border-red-500" : ""}
                                disabled={disableButton}
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

                        <FieldForm label="creditorUnique" name="Credor:" obrigatory={false} error={errors.creditorUnique && "Inválido"}>
                            <SelectField
                                name="creditorUnique"
                                id="creditorUnique"
                                styles={classNames("w-fit min-w-full", {
                                    "border-red-500": errors.creditorUnique
                                })}
                                onForm={true}
                                register={register}
                                value={watch("creditorUnique")}
                                disabled={creditorsUnique.length == 0 || disableButton}
                                OnChange={changedCreditorUnique}
                            >
                                {getValues("creditorUnique") == "disabled" ? (
                                    <Option value="disabled" firstValue="Selecione um credor" />
                                ) : (
                                    <>

                                        {creditorsUnique.length > 1 && (
                                            <Option value="0" firstValue="Selecione um credor" />
                                        )}

                                        {creditorsUnique.length == 0 && (
                                            <Option value="0" firstValue="Selecione um credor" />
                                        )}

                                        {creditorsUnique.map((creditorUnique, index: number) => {
                                            return (
                                                <Option 
                                                    key={index}
                                                    value={creditorUnique.Id_Unique_Creditor}
                                                    firstValue={creditorUnique.Creditor}
                                                />
                                            )
                                        })}
                                    </>
                                )}
                            </SelectField>
                        </FieldForm>

                        <FieldForm label="ocorrence" name="Ocorrência:" obrigatory={false} error={errors.ocorrence && "Inválido"}>
                            <SelectField
                                name="ocorrence"
                                id="ocorrence"
                                styles={`w-fit min-w-full ${errors.ocorrence && "border-red-500"}`}
                                required
                                OnChange={() => changedOcorrences()}
                                disabled={ocorrences.length == 0 || disableButton}
                                onForm={true}
                                register={register}
                                value={watch("ocorrence")}
                            >
                                {getValues("ocorrence") == "disabled" ? (
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

                        <FieldForm label="phase" name="Fase:" obrigatory={false} error={errors.phase && "Inválido"}>
                            <SelectField
                                name="phase"
                                id="phase"
                                styles={`w-fit min-w-full ${errors.phase && "border-red-500"}`}
                                disabled={agings.length == 0 || disableButton}
                                onForm={true}
                                value={watch("phase")}
                                register={register}
                                OnChange={() => changedPhases()}
                            >
                                {getValues("phase") == "disabled" ? (
                                    <Option value={"disabled"} firstValue="Selecione uma fase" />
                                ) : (
                                    <>
                                        <Option value={"0"} firstValue={"Selecione uma fase"} />

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
                            disabled={disableButton}
                        />
                    </form>

                    {notFoundMessage != "" && (
                        <div className={`p-2 bg-red-400 rounded-md`}>
                            {notFoundMessage == "creditorUnique" && (
                                <p className="text-white font-medium">
                                    Não foi possível encontrar os credores
                                </p>
                            )}

                            {notFoundMessage == "ocorrences" && (
                                <p className={`text-white font-medium`}>
                                    Não foi possível encontrar as ocorrências
                                </p>
                            )}

                            {notFoundMessage == "agings" && (
                                <p className={`text-white font-medium`}>
                                    Não foi possível encontrar as fases
                                </p>
                            )}

                            {notFoundMessage == "questions" && (
                                <p className={`text-white font-medium`}>
                                    Não foi possível encontrar as perguntas
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {questions.questions.length > 0 && questions.behavioral.length > 0 &&
                <TableLooseMonitoring
                    questions={questions}
                    operators={operators}
                    headerInfo={headerInfo}
                    responsableList={responsableList}
                />
            }
        </>
    )
}

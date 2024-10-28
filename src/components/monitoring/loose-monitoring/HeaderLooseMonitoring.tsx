'use client'

import { verifyUserToken } from "@/api/generics/verifyToken";
import { getMonitoringQuestions } from "@/api/monitoring/answer-monitoring/getMonitoringQuestions";
import { getAgingByCreditorAndOcorrence } from "@/api/monitoring/config-monitoring/getAgingByCreditorAndOcorrence";
import { getOcorrencesByCreditor } from "@/api/monitoring/config-monitoring/getOcorrencesByCreditor";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Option } from "@/components/Option";
import { SelectField } from "@/components/SelectField";
import { IAgings } from "@/interfaces/generics/IAgings";
import { ILooseMonitoringHeader, ILooseHeaderConfigData, ILooseHeaderConfigSchema, ILooseMonitoringHeaderInfo } from "@/interfaces/monitoring/loose-monitoring/ILooseMonitoring";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import TableLooseMonitoring from "./TableLooseMonitoring";

export function HeaderLooseMonitoring({ creditors, setValueQuestionList, setValuesHeader, questions, operators }: ILooseMonitoringHeader) {

    const router = useRouter()

    const [ocorrences, setOcorrences] = useState<{ Id_Ocorrence: number, Ocorrence: string }[]>([])
    const [agings, setAgings] = useState<IAgings[]>([])
    const [notFoundMessage, setNotFoundMessage] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    const [headerInfo, setHeaderInfo] = useState<ILooseMonitoringHeaderInfo>({ creditor: "", ocorrence: "", phase: "" })
    const { register, handleSubmit, watch, formState: { errors }, getValues, setValue } = useForm<ILooseHeaderConfigData>({
        defaultValues: {
            creditor: "0",
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
                    Id_Ocorrence: Number(data.ocorrence),
                    Id_Aging: Number(data.phase)
                }
            ]

            setHeaderInfo({
                creditor: String(data.creditor),
                ocorrence: String(data.ocorrence),
                phase: String(data.phase)
            }) 

            const getQuestions = await getMonitoringQuestions(configObject)

            setDisableButton(false)

            if (getQuestions.questions <= 0 && getQuestions.behavioral <= 0) {
                setNotFoundMessage("questions")

                return
            }

            setValueQuestionList(getQuestions, true)

            setValuesHeader(Number(data.creditor), Number(data.ocorrence), Number(data.phase))

            return
        }

        if (data.ocorrence != "disabled") {
            const getAgings = await getAgingByCreditorAndOcorrence(Number(data.creditor), Number(data.ocorrence))

            setDisableButton(false)

            if (!getAgings.status) {
                setNotFoundMessage("agings")

                return
            }

            setAgings(getAgings.data)
            setValue("phase", "0")

            return
        }

        const getOcorrences = await getOcorrencesByCreditor(Number(data.creditor))

        setDisableButton(false)

        if (!getOcorrences.status) {
            setNotFoundMessage("ocorrences")

            return
        }

        setOcorrences(getOcorrences.data)
        setValue("ocorrence", "0")
    }

    function changedCreditors() {
        setValue("ocorrence", "disabled")
        setValue("phase", "disabled")
        setOcorrences([])
        setAgings([])
        setValuesHeader(0, 0, 0)
        setValueQuestionList({ questions: [], behavioral: [] }, false)
    }

    function changedOcorrences() {
        setValue("phase", "disabled")
        setAgings([])
        setValuesHeader(0, 0, 0)
        setValueQuestionList({ questions: [], behavioral: [] }, false)
    }

    function changedPhases() {
        setValuesHeader(0, 0, 0)
        setValueQuestionList({ questions: [], behavioral: [] }, false)
    }

    return (
        <>
            <section className={`flex items-end justify-center gap-2 mb-8 mx-28`}>
                <div className={`flex flex-col gap-2`}>
                    <form
                        className={`flex items-end gap-2`}
                        onSubmit={handleSubmit(handleGetRelations)}
                    >
                        <FieldForm label="creditor" name="Credor:" obrigatory={false} error={errors.creditor && "Inválido"}>
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

            {questions.questions.length > 0 && questions.behavioral.length > 0 &&
                <TableLooseMonitoring
                    questions={questions}
                    operators={operators}
                    headerInfo={headerInfo}
                />
            }
        </>
    )
}
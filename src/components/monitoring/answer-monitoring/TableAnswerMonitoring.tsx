'use client'

import { IAnswerTable } from "@/interfaces/monitoring/answer-monitoring/IAnswerTable";
import { Ancora } from "@/components/Ancora";
import { useRef, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { realizedMonitoring } from "@/api/monitoring/answer-monitoring/realizedMonitoring";
import toast, { Toaster } from "react-hot-toast";
import { uploadAudioMonitoring } from "@/api/monitoring/answer-monitoring/audioMonitoring";
import { useRouter } from "next/navigation";
import { answerMonitoringData, answerMonitoringSchema } from "@/interfaces/monitoring/answer-monitoring/IAnswerMonitoringData";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyUserToken } from "@/api/generics/verifyToken";
import { deleteMonitoring } from "@/api/monitoring/answer-monitoring/deleteMonitoring";

export function TableAnswerMonitoring({ questions, config, idSchedule }: IAnswerTable) {

    const dialog = useRef<HTMLDialogElement>(null)

    async function openDialog() {
        dialog.current?.showModal()
    }

    async function closeModal() {
        dialog.current?.close()
    }

    const fileList = useRef<HTMLInputElement>(null)

    function verifyFile() {
        if (fileList.current!.files!.length > 0) {
            setFileLength(fileList.current!.files!.length)
            setValue("file", fileList.current!.files![0])
        }
    }

    const [hasQuestions, setHasQuestions] = useState(questions.questions.length == 0 && questions.behavioral.length == 0 ? false : true)
    const [behavioralNote, setBehavioralNote] = useState(1000)
    const [questionsNote, setQuestionsNote] = useState(1000)
    const [fileLength, setFileLength] = useState(0)
    const [disableButton, setDisableButton] = useState(false)

    const router = useRouter()

    const { control, register, handleSubmit, watch, formState: { errors }, setError, reset, setValue, getValues }
        = useForm<answerMonitoringData>({
            defaultValues: {
                observation: "",
                questions: questions.questions.map((item, i) => {
                    return {
                        idQuestion: item.idQuestion,
                        question: item.question,
                        note: item.note,
                        subquestions: item.subquestion == undefined ? [] : item.subquestion.map((sub, i) => {
                            return {
                                idSubquestion: sub.idSubquestion,
                                subquestion: sub.subquestion,
                                answer: true,
                                note: item.note / item.subquestion.length
                            }
                        }),
                        answer: true
                    }
                }),
                behavioral: questions.behavioral.map((item, i) => {
                    return {
                        idQuestion: item.idQuestion,
                        question: item.question,
                        note: item.note,
                        answer: true
                    }
                }),
                file: null
            },
            resolver: zodResolver(answerMonitoringSchema)
        })

    const { fields: fieldsQuestions, update: updateQuestions } = useFieldArray({
        control,
        name: "questions"
    })

    const { fields: fieldsBehavioral, update: updateBehavioral } = useFieldArray({
        control,
        name: "behavioral"
    })

    function updateBehavioralAnswer(i: number, status: boolean) {
        const object = fieldsBehavioral[i]

        if (status == object.answer) {
            return
        }

        object.answer = !object.answer

        updateBehavioral(i, object)
        calculateNote()
    }

    function updateQuestionAnswer(i: number, status: boolean) {
        const object = fieldsQuestions[i]

        if (status == object.answer) {
            return
        }

        object.answer = !object.answer

        updateQuestions(i, object)
        calculateNote()
    }

    function updateSubQuestionsAnswer(indexQuestion: number, indexSubQuestion: number, status: boolean) {
        const object = fieldsQuestions[indexQuestion]

        if (status == object.subquestions[indexSubQuestion].answer) {
            return
        }

        object.subquestions[indexSubQuestion].answer = !object.subquestions[indexSubQuestion].answer

        updateQuestions(indexQuestion, object)
        calculateNote()
    }

    function calculateNote() {
        const behavioralObject = fieldsBehavioral.filter((item, i) => item.answer == true)
        const questionsObject = fieldsQuestions.filter((item, i) => item.answer == true && item.subquestions.length == 0)
        const existSubQuestions = fieldsQuestions.filter((item, i) => item.subquestions.length > 0)
        let subQuestionsTotalNote = 0
        existSubQuestions.map((item, i) => {
            item.subquestions.map((sub: any, i: number) => {
                if (sub.answer) {
                    subQuestionsTotalNote += sub.note!
                }
            })
        })
        let questionsNote = questionsObject.reduce((sum: number, { note = 0 }) => sum + note, 0)

        setBehavioralNote(behavioralObject.reduce((sum: number, { note = 0 }) => sum + note, 0))
        setQuestionsNote(questionsNote + subQuestionsTotalNote)
    }

    async function handleSubmitForm(data: FieldValues) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableButton(true)

        const file = getValues("file")
        const questionsObject: any[] = []

        if (file == null) {
            setError("file", {
                type: "400"
            })
        }

        for (let i = 0; i < data.questions.length; i++) {
            const question = data.questions[i];

            if (question.subquestions.length > 0) {
                const subquestions = []

                for (let index = 0; index < question.subquestions.length; index++) {
                    const element = question.subquestions[index];

                    subquestions.push({
                        answer: element.answer ? "true" : "false",
                        idSubquestion: element.idSubquestion
                    })
                }

                questionsObject.push({
                    idQuestion: question.idQuestion,
                    answer: question.answer ? "true" : "false",
                    subquestion: subquestions
                })
            } else {
                questionsObject.push({
                    idQuestion: question.idQuestion,
                    answer: question.answer ? "true" : "false",
                })
            }
        }

        const behavioralObject = []

        for (let i = 0; i < data.behavioral.length; i++) {
            const behavioral = data.behavioral[i];

            behavioralObject.push({
                answer: behavioral.answer ? "true" : "false",
                idQuestion: behavioral.idQuestion,
            })
        }

        const object = {
            config: {
                idNegotiator: config[0].id_user,
                idEvaluator: 0,
                idCreditor: config[0].Id_Creditor,
                idOcorrence: config[0].Id_Ocorrence,
                idAgenda: idSchedule,
                idAging: config[0].Id_Aging
            },
            answers: [...questionsObject, ...behavioralObject],
            result: {
                note: questionsNote,
                noteBehavioral: behavioralNote,
                observation: data.observation
            }
        }

        const monitoring = await realizedMonitoring(object)

        if (!monitoring.status) {
            toast.error("Erro ao salvar a monitoria realizada. Por favor, verifique todos os valores.", {
                duration: 5000
            })

            setDisableButton(false)
            return
        }

        const formData = new FormData()
        formData.append("gravacao", file!)

        const uploadAudio = await uploadAudioMonitoring(monitoring.data.idForm, config[0].id_user, formData)

        if (!uploadAudio) {
            toast.error("Erro ao enviar o arquivo! Verifique se ele é .mp3/.wav", {
                duration: 5000
            })

            setDisableButton(false)

            await deleteMonitoring(monitoring.data.idForm)

            return
        }

        toast.success("Sucesso ao salvar a monitoria realizada!", {
            duration: 5000
        })

        router.push("/monitoring/realized")
    }

    return (
        <>
            <main className={`flex flex-col gap-2 m-2 p-2`}>
                {!hasQuestions ?
                    <p className={`font-medium p-2 text-red-400 rounded-md w-fit`}>
                        Nenhuma pergunta encontrada. Faça um preparo antes.
                    </p>
                    :
                    <>
                        <div className={`flex flex-col gap-2`}>
                            <h3 className={`text-2xl font-bold text-black/80 dark:text-slate-100`}>
                                Perguntas de Negociação
                            </h3>

                            <div className={`max-h-[20rem] overflow-y-auto flex flex-col gap-2`}>
                                {questions.questions != undefined || null ? fieldsQuestions.map((item, i) => {
                                    return (
                                        <>
                                            <article key={item.id} className={`flex items-center justify-between gap-2 bg-slate-200 p-2 border border-slate-300 rounded-md dark:bg-zinc-800 dark:border-[--border-dark] dark:text-slate-100`}>
                                                <p>
                                                    {item.question}
                                                    <span className={`p-1 bg-white dark:bg-zinc-700 dark:border-[--border-dark] rounded-lg border border-slate-400 px-2 ml-2`}>
                                                        {item.note}
                                                    </span>
                                                </p>

                                                {item.subquestions.length == 0 &&
                                                    <div className={`flex gap-2`}>
                                                        <label htmlFor={`positiveAnswer ${item.id}`} className={`cursor-pointer`}>
                                                            Sim:
                                                            <input
                                                                id={`positiveAnswer ${item.id}`}
                                                                type="radio"
                                                                onClick={() => updateQuestionAnswer(i, true)}
                                                                checked={item.answer}
                                                            />
                                                        </label>

                                                        <label htmlFor={`negativeAnswer ${item.id}`} className={`cursor-pointer`}>
                                                            Não:
                                                            <input
                                                                type="radio"
                                                                id={`negativeAnswer ${item.id}`}
                                                                onClick={() => updateQuestionAnswer(i, false)}
                                                                checked={!item.answer}
                                                            />
                                                        </label>
                                                    </div>
                                                }
                                            </article>

                                            {item.subquestions.length > 0 &&
                                                <div className={`flex flex-col gap-2`}>
                                                    {item.subquestions.map((sub: any, index: number) => {

                                                        const mathRandom = Math.random()
                                                        return (
                                                            <article key={index} className={`flex items-center justify-between gap-2 bg-slate-100 p-2 border border-slate-300 rounded-md dark:bg-zinc-600/70 dark:border-[--border-dark] dark:text-slate-100 ml-20`}>
                                                                <p>
                                                                    {sub.subquestion}
                                                                    <span className={`p-1 bg-white dark:bg-zinc-700 dark:border-[--border-dark] rounded-lg border border-slate-400 px-2 ml-2`}>
                                                                        {(item.note / item.subquestions.length).toFixed(2)}
                                                                    </span>
                                                                </p>

                                                                <div className={`flex gap-2`}>
                                                                    <label htmlFor={`positiveAnswer ${index + mathRandom}`} className={`cursor-pointer`}>
                                                                        Sim:
                                                                        <input
                                                                            id={`positiveAnswer ${index + mathRandom}`}
                                                                            type="radio"
                                                                            onClick={() => updateSubQuestionsAnswer(i, index, true)}
                                                                            checked={sub.answer}
                                                                        />
                                                                    </label>

                                                                    <label htmlFor={`negativeAnswer ${index + mathRandom}`} className={`cursor-pointer`}>
                                                                        Não:
                                                                        <input
                                                                            type="radio"
                                                                            id={`negativeAnswer ${index + mathRandom}`}
                                                                            onClick={() => updateSubQuestionsAnswer(i, index, false)}
                                                                            checked={!sub.answer}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </article>
                                                        )
                                                    })}
                                                </div>
                                            }
                                        </>
                                    )
                                }) :
                                    <p className={`font-medium p-2 text-black/80 rounded-md w-fit dark:text-white`}>
                                        Nenhuma consideração
                                    </p>
                                }
                            </div>
                        </div>

                        <div className={`flex flex-col gap-2 mt-4`}>
                            <h3 className={`text-2xl font-bold text-black/80 dark:text-slate-100`}>
                                Perguntas comportamentais
                            </h3>

                            <div className={`max-h-[20rem] overflow-y-auto flex flex-col gap-2`}>
                                {questions.behavioral != undefined || null ? fieldsBehavioral.map((item, i) => {
                                    return (
                                        <article key={item.id} className={`flex items-center justify-between gap-2 bg-slate-200 p-2 border border-slate-300 rounded-md dark:bg-zinc-800 dark:border-[--border-dark] dark:text-slate-100`}>
                                            <p>
                                                {item.question}
                                                <span className={`p-1 bg-white dark:bg-zinc-700 dark:border-[--border-dark] rounded-lg border border-slate-400 px-2 ml-2`}>
                                                    {item.note}
                                                </span>
                                            </p>

                                            <div className={`flex gap-2`}>
                                                <label htmlFor={`positiveAnswer ${item.id}`} className={`cursor-pointer`}>
                                                    Sim:
                                                    <input
                                                        id={`positiveAnswer ${item.id}`}
                                                        type="radio"
                                                        onClick={() => updateBehavioralAnswer(i, true)}
                                                        checked={item.answer}
                                                    />
                                                </label>

                                                <label htmlFor={`negativeAnswer ${item.id}`} className={`cursor-pointer`}>
                                                    Não:
                                                    <input
                                                        type="radio"
                                                        id={`negativeAnswer ${item.id}`}
                                                        onClick={() => updateBehavioralAnswer(i, false)}
                                                        checked={!item.answer}
                                                    />
                                                </label>
                                            </div>
                                        </article>
                                    )
                                }) :
                                    <p className={`font-medium p-2 text-black/80 rounded-md w-fit dark:text-white`}>
                                        Nenhuma consideração comportamental
                                    </p>
                                }
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(handleSubmitForm)}>
                            <div className={`flex items-end justify-end gap-5 w-full`}>
                                <p className={`font-medium`}>
                                    Nota final: {questionsNote.toFixed(2)}
                                </p>
                                <p className={`font-medium`}>
                                    Nota comportamental: {behavioralNote.toFixed(2)}
                                </p>

                                <Button
                                    type="button"
                                    text="Adicione o áudio"
                                    styles={`mt-4 w-fit h-10 text-md`}
                                    disabled={false}
                                    OnClick={() => openDialog()}
                                />

                                <dialog
                                    ref={dialog}
                                    id="uploadAudio"
                                    className={`w-3/4 max-lg:w-4/5 p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
                                >
                                    <h2 className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}>
                                        Importe o áudio da monitoria
                                    </h2>

                                    <input
                                        ref={fileList}
                                        type="file"
                                        name="audio"
                                        className={`w-fit mb-8 border-2 rounded-md dark:text-white
                                                    ${errors.file ? "border-[--label-color-error] dark:border-[--label-color-error]" : ""}
                                                `}
                                        accept={".wav, .mp3"}
                                        onChange={() => verifyFile()}
                                    />

                                    <div className={`my-2 flex flex-col gap-2 w-full`}>
                                        <FieldForm
                                            label="observation"
                                            name="Observação:"
                                            error={errors.observation && "Inválido"}
                                        >
                                            <textarea
                                                id="observation"
                                                className={`block my-1 w-full h-28 border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 p-2 dark:bg-zinc-700 dark:border-zinc-900
                                                            ${errors.observation ? "focus:border-[--label-color-error] dark:focus:border-[--label-color-error]" : ""}
                                                        `}
                                                {...register("observation")}
                                                value={watch("observation")}
                                            />
                                        </FieldForm>

                                        <div className={`flex justify-end gap-2 mt-2`}>
                                            <Button
                                                type="button"
                                                text="Fechar"
                                                styles={`w-fit h-10 border-red-400 bg-red-400 text-white hover:bg-red-500 focus:bg-red-400 text-md px-2 py-2`}
                                                OnClick={() => closeModal()}
                                            />

                                            <Button
                                                name="answers"
                                                value=""
                                                type="submit"
                                                text="Finalizar Monitoria"
                                                styles={`w-fit h-10 text-md`}
                                                disabled={disableButton}
                                            />
                                        </div>
                                    </div>
                                </dialog>
                            </div>
                        </form>
                    </>
                }
            </main>

            <Toaster 
                position="bottom-right"
                reverseOrder={false}
            />

            <Ancora
                title="Voltar"
                toGo="/monitoring/schedule-monitoring"
                styles={`ml-1 mb-1 w-16`}
            />
        </>

    )
}
import { saveOptionsAndQuestions } from "@/api/monitoring/config-monitoring/saveOptionsAndQuestions";
import { Button } from "@/components/Button";
import { IConfigFormSchema, IConfigQuestionsProps } from "@/interfaces/monitoring/config-monitoring/IConfigQuestions";
import { IQuestionsBehavioral, IQuestionsGeneric, IQuestionsNegotiation } from "@/interfaces/monitoring/config-monitoring/IHeaderSelectConfig";
import { faAnglesLeft, faAnglesRight, faArrowDown, faArrowLeft, faArrowRight, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function ConfigQuestions({ questionsList, idCreditor, idOcorrence, idAging, resetAllValues, disableAllButtons, setValueDisableAllButtons }: IConfigQuestionsProps) {
    const [totalOfNotes, setTotalOfNotes] = useState(questionsList.questions.reduce((sum, { note = 0 }) => sum + note, 0))
    const [totalOfNotesBehavioral, setTotalOfNotesBehavioral] = useState(questionsList.behavioral.reduce((sum, { note = 0 }) => sum + note, 0))

    const { control, register, handleSubmit, watch, formState: { errors }, setValue, reset, setFocus, clearErrors } = useForm<{ questions: IQuestionsNegotiation[], behavioral: IQuestionsBehavioral[], generic: IQuestionsGeneric[] }>({
        defaultValues: {
            questions: useMemo(() => {
                setTotalOfNotes(questionsList.questions.reduce((sum, { note = 0 }) => sum + note, 0))
                return questionsList.questions
            }, [questionsList]),
            behavioral: useMemo(() => {
                setTotalOfNotesBehavioral(questionsList.behavioral.reduce((sum, { note = 0 }) => sum + note, 0))
                return questionsList.behavioral
            }, [questionsList]),
            generic: useMemo(() => {
                return questionsList.generic
            }, [questionsList]),
        },
        resolver: zodResolver(IConfigFormSchema)
    })

    const { fields: fieldsQuestions, insert: insertQuestions, remove: removeQuestions, update: updateQuestions } = useFieldArray({
        control,
        name: "questions"
    })

    const { fields: fieldsBehavioral, insert: insertBehavioral, remove: removeBehavioral, update: updateBehavioral } = useFieldArray({
        control,
        name: "behavioral"
    })

    const { fields: fieldsGeneric, remove: removeGeneric } = useFieldArray({
        control,
        name: "generic"
    })

    useEffect(() => {
        reset({ questions: questionsList.questions, behavioral: questionsList.behavioral, generic: questionsList.generic })
    }, [questionsList, reset])

    function allDroppedQuestionsToOtherSide() {
        const fieldsGetQuestions = [...fieldsGeneric, ...fieldsQuestions, ...fieldsBehavioral]

        setValue("generic", fieldsGetQuestions)
        setValue("questions", [])
        setValue("behavioral", [])
        setTotalOfNotes(0)
        setTotalOfNotesBehavioral(0)
    }

    function allQuestionsToOtherSide() {
        const questionsNegotiation = fieldsQuestions
        const questionsBehavioral = fieldsBehavioral

        for (let i = 0; i < fieldsGeneric.length; i++) {
            const questionGeneric = fieldsGeneric[i]

            if (!questionGeneric.isBehavioral) {
                questionsNegotiation.push({
                    idQuestion: questionGeneric.idQuestion,
                    isBehavioral: questionGeneric.isBehavioral,
                    note: 0,
                    position: questionsNegotiation.length + 1,
                    question: questionGeneric.question,
                    id: questionGeneric.id
                })
            } else {
                questionsBehavioral.push({
                    idQuestion: questionGeneric.idQuestion,
                    isBehavioral: questionGeneric.isBehavioral,
                    note: 0,
                    position: questionsNegotiation.length + 1,
                    question: questionGeneric.question,
                    id: questionGeneric.id
                })
            }

            setValue("generic", [])
            setValue("questions", questionsNegotiation)
            setValue("behavioral", questionsBehavioral)
            calculateNotes()
        }
    }

    function moveToGenericQuestions(index: number, isBehavioral: boolean) {
        if (isBehavioral) {
            const questionBehavioral = fieldsBehavioral[index]
            const generics = fieldsGeneric

            generics.push(questionBehavioral)
            removeBehavioral(index)
            setValue("generic", generics)

            calculateNotesQuestionGoOut(index, isBehavioral)

            return
        }

        const question = fieldsQuestions[index]
        const generics = fieldsGeneric
        generics.push(question)

        removeQuestions(index)
        setValue("generic", generics)

        calculateNotesQuestionGoOut(index, isBehavioral)
    }

    function moveToSelectQuestions(index: number) {
        const question = fieldsGeneric[index]
        const questionPosition = fieldsQuestions.length > 0 ? fieldsQuestions[fieldsQuestions.length - 1].position : 1
        const behavioralPosition = fieldsBehavioral.length > 0 ? fieldsBehavioral[fieldsBehavioral.length - 1].position : 1

        if (question.isBehavioral) {
            const questionsBehavioralLength = fieldsBehavioral.length

            removeGeneric(index)

            insertBehavioral(questionsBehavioralLength, {
                idQuestion: question.idQuestion,
                isBehavioral: question.isBehavioral,
                question: question.question,
                note: 0,
                position: questionPosition > behavioralPosition ? questionPosition + 1 : behavioralPosition + 1
            })

            calculateNotes()

            return
        }

        const questionsNegotiatorLength = fieldsQuestions.length

        removeGeneric(index)

        insertQuestions(questionsNegotiatorLength, {
            idQuestion: question.idQuestion,
            isBehavioral: question.isBehavioral,
            question: question.question,
            note: 0,
            position: questionPosition > behavioralPosition ? questionPosition + 1 : behavioralPosition + 1
        })

        calculateNotes()

    }

    function calculateNotes() {
        setTotalOfNotes(fieldsQuestions.length > 0 ? fieldsQuestions.reduce((sum, { note = 0 }) => Number(sum) + Number(note), 0) : 0)
        setTotalOfNotesBehavioral(fieldsBehavioral.length > 0 ? fieldsBehavioral.reduce((sum, { note = 0 }) => Number(sum) + Number(note), 0) : 0)
    }

    function calculateNotesQuestionGoOut(index: number, isBehavioral: boolean) {
        if (isBehavioral) {

            const behavioralValues = fieldsBehavioral.filter((_item, indexNumber) => index != indexNumber)
            const sumBehavioral = behavioralValues.length > 0 ? behavioralValues.reduce((sum, { note = 0 }) => Number(sum) + Number(note), 0) : 0

            setTotalOfNotesBehavioral(sumBehavioral)

            return
        }

        const negotiationValues = fieldsQuestions.filter((_item, indexNumber) => indexNumber != index)
        const sumNegotiation = negotiationValues.length > 0 ? negotiationValues.reduce((sum, { note = 0 }) => Number(sum) + Number(note), 0) : 0 

        setTotalOfNotes(sumNegotiation)
    }

    function calculateNotesWithSetValue(index: number, note: number, isBehavioral: boolean) {
        if (isBehavioral) {

            if (note > 0) {
                clearErrors(`behavioral.${index}.note`)
            }

            const questionBehavioralNote = fieldsBehavioral[index]
            questionBehavioralNote.note = note
            const behavioralValues = fieldsBehavioral.filter((_item, indexNumber) => index != indexNumber)
            const sumBehavioral = behavioralValues.reduce((sum, { note = 0 }) => Number(sum) + Number(note), 0)

            setTotalOfNotesBehavioral(sumBehavioral + note)
            updateBehavioral(index, questionBehavioralNote)
            setTimeout(() => {
                setFocus(`behavioral.${index}.note`)
            }, 50)

            return
        }

        if (note > 0) {
            clearErrors(`questions.${index}.note`)
        }

        const questionNegotiationNote = fieldsQuestions[index]
        questionNegotiationNote.note = note
        const negotiationValues = fieldsQuestions.filter((_item, indexNumber) => index != indexNumber)
        const sumNegotiation = negotiationValues.reduce((sum, { note = 0 }) => Number(sum) + Number(note), 0)
        setTotalOfNotes(sumNegotiation + note)
        updateQuestions(index, questionNegotiationNote)
        setTimeout(() => {
            setFocus(`questions.${index}.note`)
        }, 50)
    }

    function positionGoUp(index: number, isBehavioral: boolean) {

        if (index == 0) {
            return
        }

        if (isBehavioral) {

            const questionGoUp = fieldsBehavioral[index]
            const oldPositionUp = questionGoUp.position
            const questionGoDown = fieldsBehavioral[index - 1]
            const oldPositionDown = questionGoDown.position
            questionGoUp.position = oldPositionDown
            questionGoDown.position = oldPositionUp

            updateBehavioral(index - 1, questionGoUp)
            updateBehavioral(index, questionGoDown)

            return
        }

        const questionGoUp = fieldsQuestions[index]
        const oldPositionUp = questionGoUp.position
        const questionGoDown = fieldsQuestions[index - 1]
        const oldPositionDown = questionGoDown.position
        questionGoUp.position = oldPositionDown
        questionGoDown.position = oldPositionUp

        updateQuestions(index - 1, questionGoUp)
        updateQuestions(index, questionGoDown)
    }

    function positionGoDown(index: number, isBehavioral: boolean) {
        if (isBehavioral) {

            if (fieldsBehavioral.length == index) {
                return
            }

            const questionGoDown = fieldsBehavioral[index]
            const oldPositionDown = questionGoDown.position
            const questionGoUp = fieldsBehavioral[index + 1]
            const oldPositionUp = questionGoUp.position
            questionGoUp.position = oldPositionDown
            questionGoDown.position = oldPositionUp

            updateBehavioral(index + 1, questionGoDown)
            updateBehavioral(index, questionGoUp)

            return
        }

        if (fieldsQuestions.length == index) {
            return
        }

        const questionGoDown = fieldsQuestions[index]
        const oldPositionDown = questionGoDown.position
        const questionGoUp = fieldsQuestions[index + 1]
        const oldPositionUp = questionGoUp.position
        questionGoUp.position = oldPositionDown
        questionGoDown.position = oldPositionUp

        updateQuestions(index + 1, questionGoDown)
        updateQuestions(index, questionGoUp)
    }

    async function handleSaveMonitoryQuestions(data: FieldValues) {
        setValueDisableAllButtons(true)

        const questionsAll = [...data.questions, ...data.behavioral]
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
            idCreditor,
            idOcorrence,
            idAging,
            questions
        }
        
        const setMonitoryStatus = await saveOptionsAndQuestions<typeof object>(object)

        setValueDisableAllButtons(false)

        if (!setMonitoryStatus) {
            toast.error("Houve um erro ao salvar as perguntas da monitoria, revise os valores e tente novamente!", {
                duration: 5000
            })

            return
        }

        toast.success("Monitoria salva com sucesso!", {
            duration: 5000
        })

        resetAllValues()
    }

    return (
        <form onSubmit={handleSubmit(handleSaveMonitoryQuestions)}>
            <div className={`flex items-center justify-center gap-10`}>
                <button
                    type="button"
                    onClick={() => allDroppedQuestionsToOtherSide()}
                    title="Mover tudo para o lado direito"
                    disabled={disableAllButtons}
                >
                    <FontAwesomeIcon icon={faAnglesRight} className="text-blue-500 cursor-pointer hover:text-white duration-200 hover:bg-blue-400 p-2 rounded-full" />
                </button>

                <button
                    type="button"
                    onClick={() => allQuestionsToOtherSide()}
                    title="Mover tudo para o lado esquerdo"
                    disabled={disableAllButtons}
                >
                    <FontAwesomeIcon icon={faAnglesLeft} className="text-blue-500 cursor-pointer hover:text-white duration-200 hover:bg-blue-400 p-2 rounded-full" />
                </button>
            </div>
            <div className={`flex justify-between gap-2 p-2 px-4`}>
                <article
                    className={`w-1/2 h-[25rem] p-2 gap-2 border border-slate-300 rounded-md flex flex-col overflow-y overflow-x-hidden`}
                >
                    {fieldsQuestions.length > 0 || fieldsBehavioral.length > 0 ? (
                        <>
                            {fieldsQuestions.length > 0 && (
                                <>
                                    <h2 className="font-bold">Negociação:</h2>
                                    {fieldsQuestions.map((item, index) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex items-center w-full rounded-md odd:bg-slate-200 even:bg-slate-300 p-1
                                                 dark:odd:bg-slate-500 dark:even:bg-slate-600 relative`}
                                            >
                                                <span
                                                    className={`mx-2 px-2 py-[2px] text-[14px] flex items-center justify-center font-medium rounded-full shadow-[0px_0px_1px_1px_rgba(0,0,0,0.8)]`}
                                                >
                                                    {index + 1}
                                                </span>

                                                <article
                                                    id={String(index)}
                                                    className={`flex w-[70%] gap-2 p-2`}
                                                >
                                                    <p id={String(index)}>
                                                        {item.question}
                                                    </p>
                                                </article>

                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-[146px] bg-emerald-400 hover:bg-emerald-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                    disabled={index == 0 || disableAllButtons}
                                                    onClick={() => positionGoUp(index, false)}
                                                >
                                                    <FontAwesomeIcon icon={faArrowUp} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-[114px] bg-red-400 hover:bg-red-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                    disabled={index + 1 == fieldsQuestions.length || disableAllButtons}
                                                    onClick={() => positionGoDown(index, false)}
                                                >
                                                    <FontAwesomeIcon icon={faArrowDown} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-20 bg-blue-400 hover:bg-blue-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                    onClick={() => moveToGenericQuestions(index, false)}
                                                    disabled={disableAllButtons}
                                                >
                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                </button>

                                                <input
                                                    className={
                                                        `absolute bottom-0 right-0 w-16 h-7 bg-white m-1 ml-2 pl-2 rounded-sm rounded-br-md dark:bg-slate-800 ${
                                                            errors.questions && errors.questions[index]?.note ? "border-red-400 border-2" : ""
                                                        }`
                                                    }
                                                    type="number"
                                                    max="1000"
                                                    min="0"
                                                    {...register(`questions.${index}.note`, {
                                                        onChange(event) {
                                                            if (event.target.value.length == 0) {
                                                                const questionNote = fieldsQuestions[index]
                                                                questionNote.note = 0
                                                                updateQuestions(index, questionNote)
                                                                setTimeout(() => {
                                                                    setFocus(`questions.${index}.note`)
                                                                }, 50);
                                                            }

                                                            if (String(Number(event.target.value)) == "NaN") {
                                                                return
                                                            }

                                                            calculateNotesWithSetValue(index, Number(event.target.value), false)
                                                        },
                                                    })}
                                                    value={watch(`questions.${index}.note`)}
                                                />
                                            </div>
                                        )
                                    })}
                                </>
                            )}

                            {fieldsBehavioral.length > 0 && (
                                <>
                                    <h2 className="font-bold">Comportamental:</h2>
                                    {fieldsBehavioral.map((item, index) => {
                                        return (
                                            <div
                                                key={item.id}
                                                className={`flex items-center w-full rounded-md odd:bg-slate-200 even:bg-slate-300 p-1
                                                 dark:odd:bg-slate-500 dark:even:bg-slate-600 relative`}
                                            >
                                                <span
                                                    className={`mx-2 px-2 py-[2px] text-[14px] flex items-center justify-center font-medium rounded-full shadow-[0px_0px_1px_1px_rgba(0,0,0,0.8)]`}
                                                >
                                                    {index + 1}
                                                </span>

                                                <article
                                                    id={String(index)}
                                                    className={`flex w-[70%] gap-2 p-2`}
                                                >
                                                    <p id={String(index)}>
                                                        {item.question}
                                                    </p>
                                                </article>

                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-[146px] bg-emerald-400 hover:bg-emerald-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                    disabled={index == 0 || disableAllButtons}
                                                    onClick={() => positionGoUp(index, true)}
                                                >
                                                    <FontAwesomeIcon icon={faArrowUp} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-[114px] bg-red-400 hover:bg-red-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                    disabled={index + 1 == fieldsBehavioral.length || disableAllButtons}
                                                    onClick={() => positionGoDown(index, true)}
                                                >
                                                    <FontAwesomeIcon icon={faArrowDown} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="absolute bottom-1 right-20 bg-blue-400 hover:bg-blue-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                                    onClick={() => moveToGenericQuestions(index, true)}
                                                    disabled={disableAllButtons}
                                                >
                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                </button>

                                                <input
                                                    className={`absolute bottom-0 right-0 w-16 h-7 bg-white m-1 ml-2 pl-2 rounded-sm rounded-br-md dark:bg-slate-800 ${
                                                        errors.behavioral && errors.behavioral[index]?.note ? "border-red-400 border-2" : ""
                                                    }`}
                                                    type="number"
                                                    max="1000"
                                                    min="0"
                                                    value={watch(`behavioral.${index}.note`)}
                                                    {...register(`behavioral.${index}.note`, {
                                                        onChange(event) {
                                                            if (event.target.value.length == 0) {
                                                                const questionNote = fieldsBehavioral[index]
                                                                questionNote.note = 0
                                                                updateBehavioral(index, questionNote)
                                                                setTimeout(() => {
                                                                    setFocus(`behavioral.${index}.note`)
                                                                }, 50);
                                                            }

                                                            if (String(Number(event.target.value)) == "NaN") {
                                                                return
                                                            }

                                                            calculateNotesWithSetValue(index, Number(event.target.value), true)
                                                        },
                                                    })}
                                                />
                                            </div>
                                        )
                                    })}
                                </>
                            )}

                        </>
                    ) : (
                        <p className="flex justify-center items-center self-center h-full"><strong>Coloque aqui suas perguntas!</strong></p>
                    )}
                </article>

                <article
                    className={`w-1/2 h-[25rem] p-2 flex flex-col gap-2 border border-slate-300 rounded-md overflow-y-auto ${fieldsGeneric?.length > 0
                        ? "items-start"
                        : "items-center justify-center"
                        }`}
                >
                    {fieldsGeneric.length > 0 ? fieldsGeneric.map((item, index) => {
                        return (
                            <article
                                key={item.id}
                                className={`relative flex w-full gap-2 p-2 rounded-md odd:bg-slate-200 even:bg-slate-300
                                dark:odd:bg-slate-500 dark:even:bg-slate-600
                                `}
                            >
                                <p className="w-[92%]">{item.question}</p>

                                <button
                                    type="button"
                                    className="absolute bottom-1 right-1 bg-blue-400 hover:bg-blue-500 text-white rounded-md px-2 py-1 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                                    onClick={() => moveToSelectQuestions(index)}
                                    disabled={disableAllButtons}
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </button>
                            </article>
                        )
                    }) : (
                        <p className="font-bold">Nenhuma pergunta!</p>
                    )}
                </article>
            </div>

            <div className={`flex items-end justify-end gap-2 mx-4 mb-6`}>
                <div className={`flex gap-2 items-end`}>
                    <p className={`font-medium`}>
                        Nota de negociação:
                        <span
                            className={`ml-1 font-bold text-lg ${Number(totalOfNotes) != 1000
                                ? `text-red-400`
                                : `text-green-500`
                                }`}
                        >
                            {totalOfNotes}
                        </span>
                    </p>

                    <p className={`font-medium`}>
                        Nota comportamental:
                        <span
                            className={`ml-1 font-bold text-lg ${Number(totalOfNotesBehavioral) != 1000
                                ? `text-red-400`
                                : `text-green-500`
                                }`}
                        >
                            {totalOfNotesBehavioral}
                        </span>
                    </p>

                    <Button
                        type="submit"
                        name="value"
                        text="Salvar e voltar"
                        styles={`w-15 h-12 text-md`}
                        disabled={Number(totalOfNotes) != 1000 ||
                            Number(totalOfNotesBehavioral) != 1000 ||
                            disableAllButtons}
                    />
                </div>
            </div>
        </form>
    )
}
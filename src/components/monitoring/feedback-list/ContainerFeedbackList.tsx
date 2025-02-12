'use client'

import { Ancora } from "@/components/Ancora"
import { IContainerFeedbackListProps } from "@/interfaces/monitoring/feedback/container-feedback-list/IContainerFeedbackList"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { DialogFeedback } from "./dialog/DialogFeedback"
import { FilterFeedbackList } from "./filter/FilterFeedbackList"

export function ContainerFeedbackList({ feedbacks, responsables, operators }: IContainerFeedbackListProps) {

    const [feedbacksList, setFeedbacksList] = useState(feedbacks)
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [feedbackIndex, setFeedbackIndex] = useState(0)

    function handleOpenDialog(index: number) {
        setFeedbackIndex(index)
        dialogRef.current?.showModal()
    }

    return (
        <>
            <dialog
                ref={dialogRef}
                className={`w-3/4 max-lg:w-4/5 p-4 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
            >
                <DialogFeedback 
                    feedbacks={feedbacksList} 
                    feedbackIndex={feedbackIndex}
                    dialogRef={dialogRef}
                />
            </dialog>
            <div className="relative py-4">
                <Ancora
                    title="Criar feedback"
                    toGo="/monitoring/create-feedback"
                    styles="absolute -top-8 right-0 w-fit rounded-bl-sm bg-emerald-500 text-slate-100 mr-1 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                />
            </div>

            <section>
                <FilterFeedbackList 
                    responsables={responsables}
                    operators={operators}
                    setFeedbacksList={setFeedbacksList}
                    setFeedbackIndex={setFeedbackIndex}
                />
            </section>

            <section className={`relative w-full overflow-y-auto px-2`}>
                <div className="absolute -top-[6px] right-1 font-medium">{feedbacksList.length} resultados encontrados.</div>
                <div>
                    <table className="w-full mx-auto my-4">
                        <thead className="bg-gray-200 dark:bg-zinc-800">
                            <tr>
                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tl-md">
                                    Data do Feedback
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Operador
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Responsável do Feedback
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Motivo
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tr-md">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="items-center p-1 bg-slate-100">
                            {feedbacksList.map((feedback, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                    >
                                        <td className="text-center text-sm p-2">{feedback.Created_At}</td>
                                        <td className="text-center text-sm p-2">{feedback.Operator}</td>
                                        <td className="text-center text-sm p-2" >{feedback.Responsable}</td>
                                        <td className="text-center text-sm p-2">{feedback.Reason}</td>
                                        <td className="text-center text-sm p-2">
                                            <button
                                                type="button"
                                                className={`bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 duration-100 text-white
                                                        rounded-md px-2 py-[5px]
                                                    `}
                                                onClick={() => handleOpenDialog(index)}
                                            >
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            {feedbacksList.length == 0 && (
                                <tr className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800">
                                    <td className="text-red-600 text-center text-sm p-2 dark:text-red-400">Dados não encontrados</td>
                                    <td />
                                    <td />
                                    <td />
                                    <td />
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )

}

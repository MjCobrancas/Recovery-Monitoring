'use client'

import { IContainerMonitoryRealizedProps, IMonitoryAllUsers } from "@/interfaces/monitoring/realized/IContainerMonitoryRealized"
import { faPaperPlane, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef, useState } from "react"
import { MonitoryRealizedFilter } from "./MonitoryRealizedFilter"
import toast, { Toaster } from "react-hot-toast"
import { DialogMonitoryUser } from "./DialogMonitoryUser"
import { getRealizedMonitory } from "@/api/monitoring/realized/getRealizedMonitory"
import { IResultDefaultResponse } from "@/interfaces/Generics"
import { IDialogMonitoryUser } from "@/interfaces/monitoring/realized/IDialogMonitoryUser"
import { getAudioOfMonitory } from "@/api/monitoring/realized/getAudioOfMonitory"
import { DialogCreateFeedback } from "./DialogCreateFeedback"
import { verifyUserToken } from "@/api/generics/verifyToken"
import { useRouter } from "next/navigation"

export function ContainerMonitoryRealized({ monitoryUsers, creditors, ocorrences, backOffices }: IContainerMonitoryRealizedProps) {

    const router = useRouter()

    const [disableAllButtons, setDisableAllButtons] = useState(false)
    const [monitoryRealized, setMonitoryRealized] = useState<IMonitoryAllUsers[]>(monitoryUsers)
    const [userMonitoryValues, setMonitoryUserValues] = useState<IDialogMonitoryUser | null>(null)
    const [audio, setAudio] = useState<any>(null)
    const [loadingAudio, setLoadingAudio] = useState(false)
    const [userFeedbackIndex, setUserFeedbackIndex] = useState(-1)
    const [feedbackInfo, setFeedbackInfo] = useState<IMonitoryAllUsers | null>(null)
    const [isDidFilter, setIsDidFilter] = useState(false)
    const [reloadTable, setReloadTable] = useState(false)
    const dialogMonitoryUser = useRef<HTMLDialogElement>(null)
    const dialogFeedback = useRef<HTMLDialogElement>(null)

    function setValueDidFilter(value: boolean) {
        setIsDidFilter(value)
    }

    function setValueReloadTable(value: boolean) {
        setReloadTable(value)
    }

    function setValueMonitoryRealized(value: IMonitoryAllUsers[]) {
        setMonitoryRealized(value)
    }

    function setValueDisableButtons(value: boolean) {
        setDisableAllButtons(value)
    }

    function closeDialogMonitory() {
        dialogMonitoryUser.current?.close()
    }

    function closeDialogFeedback() {
        setUserFeedbackIndex(-1)
        setFeedbackInfo(null)
        dialogFeedback.current?.close()
    }

    function handleCreateFeedback(index: number) {
        setUserFeedbackIndex(index)
        setFeedbackInfo(monitoryRealized[index])
        dialogFeedback.current?.showModal()
    }

    async function handleGetUserMonitory(id_form: number) {

        const isValidToken = await verifyUserToken()

        if (!isValidToken) {
            return router.push('/login')
        }

        setDisableAllButtons(true)
        setMonitoryUserValues(null)
        setAudio(null)
        dialogMonitoryUser.current?.showModal()
        setLoadingAudio(true)

        if (id_form <= 0) {
            return
        }

        const monitoryUser: IResultDefaultResponse<IDialogMonitoryUser | null> = await getRealizedMonitory(id_form)

        setDisableAllButtons(false)

        if (!monitoryUser.status) {
            toast.error("Erro ao buscar dados do usuário, revise os valores e tente novamente!", {
                duration: 5000
            })

            dialogMonitoryUser.current?.close()

            setLoadingAudio(false)

            return
        }

        setMonitoryUserValues(monitoryUser.data!)

        const getMonitoryAudio: any = await getAudioOfMonitory(String(id_form))

        setLoadingAudio(false)

        if (getMonitoryAudio != null) {
            const binaryData = Buffer.from(getMonitoryAudio.object.file)
            const fileBase64 = URL.createObjectURL(
                new Blob([binaryData.buffer], { type: getMonitoryAudio.object.type })
            )

            setAudio(fileBase64)
        }
    }

    return (
        <>
            <dialog
                id="feedback-dialog"
                className={`w-5/6 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
                ref={dialogFeedback}
            >
                <DialogCreateFeedback 
                    feedbackInfo={feedbackInfo}
                    userFeedbackIndex={userFeedbackIndex}
                    backOffices={backOffices}
                    closeDialogFeedback={closeDialogFeedback}
                    disableAllButtons={disableAllButtons}
                    setValueDisableButtons={setValueDisableButtons}
                    setValueReloadTable={setValueReloadTable}
                />
            </dialog>
            <dialog
                id="realized-dialog"
                className={`w-5/6 max-lg:w-3/4 p-2 rounded-lg dark:bg-slate-600 max-sm:w-full`}
                ref={dialogMonitoryUser}
            >
                <DialogMonitoryUser
                    userMonitoryValues={userMonitoryValues}
                    closeDialogMonitory={closeDialogMonitory}
                    loadingAudio={loadingAudio}
                    audio={audio}
                />
            </dialog>
            <MonitoryRealizedFilter
                creditors={creditors}
                ocorrences={ocorrences}
                disableAllButtons={disableAllButtons}
                setValueDisableButtons={setValueDisableButtons}
                setValueMonitoryRealized={setValueMonitoryRealized}
                monitoryUsers={monitoryUsers}
                setValueDidFilter={setValueDidFilter}
                reloadTable={reloadTable}
                setValueReloadTable={setValueReloadTable}
                isDidFilter={isDidFilter}
            />

            <section className={`max-h-[24.8rem] overflow-y-auto mt-4 pl-2`}>
                <div>
                    <table className="w-[96vw] mx-auto my-4">
                        <thead className="bg-gray-200 dark:bg-slate-600">
                            <tr>
                                <th className="font-semibold p-2 dark:text-white/80 rounded-tl-md"
                                >
                                    Negociador
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">Avaliador</th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Nota de Negociação</th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Nota de Comportamento
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Credor
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Ocorrência
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Fase
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Data da Monitoria
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Responsável Feedback
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80">
                                    Data do Feedback
                                </th>
                                <th className="font-semibold p-2 dark:text-white/80 rounded-tr-md"
                                >
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="items-center p-1 bg-slate-100">
                            {monitoryRealized.length > 0 && monitoryRealized.map((item, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-slate-500 dark:even:bg-slate-600"
                                    >
                                        <td className="p-2 text-center">
                                            {item.Name + " " + item.Last_Name}
                                        </td>
                                        <td className="p-2 text-center">{item.Evaluator_Name}</td>
                                        <td className="p-2 text-center">{item.Grade_Value}</td>
                                        <td className="p-2 text-center">
                                            {item.Grade_Value_Behavioral}
                                        </td>
                                        <td className="p-2 text-center">{item.Creditor}</td>
                                        <td className="p-2 text-center">{item.Ocorrence}</td>
                                        <td className="p-2 text-center">{item.Description}</td>
                                        <td className="p-2 text-center">{item.Date}</td>
                                        <td className="p-2 text-center"
                                        >
                                            {item.FeedbackResponsable == null
                                                ? "Aguardando feedback"
                                                : item.FeedbackResponsable}
                                        </td>
                                        <td className="p-2 text-center"
                                        >
                                            {item.FeedbackDate == null
                                                ? "N/A"
                                                : item.FeedbackDate}
                                        </td>
                                        <td
                                            className="p-2 text-center flex gap-2 justify-center items-center"
                                        >
                                            {item.FeedbackResponsable == null && (
                                                <button
                                                    type="button"
                                                    className={`bg-blue-400 hover:bg-blue-500 duration-100 text-white
                                                    rounded-md px-2 py-[5px]
                                                `}
                                                    name="idForm"
                                                    value={item.Id_Form}
                                                    disabled={disableAllButtons}
                                                    onClick={() =>
                                                        handleCreateFeedback(index)
                                                    }
                                                >
                                                    <FontAwesomeIcon icon={faPencil} />
                                                </button>
                                            )}

                                            <button
                                                type="button"
                                                className={`bg-blue-400 hover:bg-blue-500 duration-100 text-white
                                                rounded-md px-2 py-[5px]
                                            `}
                                                name="idForm"
                                                disabled={disableAllButtons}
                                                onClick={() => handleGetUserMonitory(item.Id_Form)}
                                            >
                                                <FontAwesomeIcon icon={faPaperPlane} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </>
    )
}
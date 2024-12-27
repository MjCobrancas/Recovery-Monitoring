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

export function ContainerMonitoryRealized({ monitoryUsers, ocorrences, backOffices, supervisor, creditorsUnique }: IContainerMonitoryRealizedProps) {

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

        if (monitoryUser.data?.monitoring[0].Id_Creditor != 10 ) {
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

        setLoadingAudio(false)
        
    }

    return (
        <>
            <dialog
                id="feedback-dialog"
                className={`w-5/6 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
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
                className={`w-5/6 max-lg:w-3/4 p-2 rounded-lg dark:bg-zinc-800 max-sm:w-full`}
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
                supervisor={supervisor}
                creditorsUnique={creditorsUnique}
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

            <section className={`max-h-[24.8rem] overflow-y-auto mt-4 px-2`}>
                <div>
                    <table className="w-full mx-auto my-4">
                        <thead className="bg-gray-200 dark:bg-zinc-800">
                            <tr>
                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tl-md">

                                </th>

                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tl"
                                >
                                    Negociador
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">Avaliador</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Nota de Negociação</th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Nota de Comportamento
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Equipe
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Credor 
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Ocorrência
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Fase
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Data da Monitoria
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Responsável Feedback
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80">
                                    Data do Feedback
                                </th>
                                <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tr-md"
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
                                        className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                    >
                                        <td className="text-center text-sm">
                                            <div className={`flex justify-center items-center gap-2`}>
                                                {item.Is_Loose_Monitoring ? (
                                                    <abbr className={`bg-indigo-500 dark:bg-indigo-600 border border-indigo-600 dark:border-indigo-700 duration-100 text-white no-underline relative hover:before:absolute hover:before:top-1/2 hover:before:left-1/2 hover:before:w-3 hover:before:h-3 hover:before:bg-indigo-500 hover:before:rotate-45 hover:before:translate-x-[-100%] hover:before:translate-y-[-280%] hover:before:dark:bg-indigo-600 hover:before:border-[1px] hover:before:border-indigo-600 hover:after:content-['Monitoria_Avulsa'] hover:after:block hover:after:absolute hover:after:p-1 hover:after:rounded-md hover:after:dark:bg-indigo-600 hover:after:bg-indigo-500 hover:after:top-[50%] hover:after:left-[50%] hover:after:translate-x-[-40%] hover:after:translate-y-[-150%]
                                                    rounded-md px-2 py-[5px]`}>
                                                        <p>M.A</p>
                                                    </abbr>
                                                ) : (
                                                    <abbr className={`bg-orange-400 dark:bg-orange-500 border border-orange-500 dark:border-orange-600 duration-100 text-white no-underline relative hover:before:absolute hover:before:top-1/2 hover:before:left-1/2 hover:before:w-3 hover:before:h-3 hover:before:bg-orange-400 hover:before:border-[1px] hover:before:border-orange-500 hover:before:rotate-45 hover:before:translate-x-[-100%] hover:before:translate-y-[-280%] hover:before:dark:bg-orange-500 hover:after:content-['Monitoria_Realizada'] hover:after:block hover:after:absolute hover:after:p-1 hover:after:rounded-md hover:after:dark:bg-orange-500 hover:after:bg-orange-400 hover:after:top-[50%] hover:after:left-[50%] hover:after:translate-x-[-40%] hover:after:translate-y-[-150%]
                                                    rounded-md px-2 py-[5px]`}>
                                                        <p>M.R</p>
                                                    </abbr>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-1 text-center text-sm">
                                            {item.Name + " " + item.Last_Name}
                                        </td>
                                        <td className="p-1 text-center text-sm">{item.Evaluator_Name}</td>
                                        <td className="text-center text-sm">{item.Grade_Value}</td>
                                        <td className="text-center text-sm">
                                            {item.Grade_Value_Behavioral}
                                        </td>
                                        <td className="p-2 text-center text-sm">{item.Creditor}</td>
                                        <td className="p-1 text-center text-sm">{item.Creditor_Unique}</td>
                                        <td className="p-1 text-center text-sm">{item.Ocorrence}</td>
                                        <td className="p-1 text-center text-sm">{item.Description}</td>
                                        <td className="p-1 text-center text-sm">{item.Date}</td>
                                        <td className="p-1 text-center text-sm"
                                        >
                                            {item.FeedbackResponsable == null
                                                ? "Aguardando feedback"
                                                : item.FeedbackResponsable}
                                        </td>
                                        <td className="p-1 text-center text-sm"
                                        >
                                            {item.FeedbackDate == null
                                                ? "N/A"
                                                : item.FeedbackDate}
                                        </td>
                                        <td
                                            className="p-1 text-center text-sm"
                                        >
                                            <div className={`flex justify-center items-center gap-2`}>
                                                {item.FeedbackResponsable == null && (
                                                    <button
                                                        type="button"
                                                        className={`bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 duration-100 text-white
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
                                                    className={`bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 duration-100 text-white
                                                rounded-md px-2 py-[5px]
                                            `}
                                                    name="idForm"
                                                    disabled={disableAllButtons}
                                                    onClick={() => handleGetUserMonitory(item.Id_Form)}
                                                >
                                                    <FontAwesomeIcon icon={faPaperPlane} />
                                                </button>
                                            </div>
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
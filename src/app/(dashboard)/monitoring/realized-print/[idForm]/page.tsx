import { getRealizedMonitory } from "@/api/monitoring/realized/getRealizedMonitory"
import { FieldForm } from "@/components/FieldForm"
import { CallPrinter } from "@/components/monitoring/realized-print/CallPrinter"
import { PaperBlock } from "@/components/PaperBlock"
import { IResultDefaultResponse } from "@/interfaces/Generics"
import { IDialogMonitoryUser } from "@/interfaces/monitoring/realized/IDialogMonitoryUser"

export default async function Page({ params }: { params: { idForm: number } }) {

    const { data: userMonitoryValues }: IResultDefaultResponse<IDialogMonitoryUser | null> = await getRealizedMonitory(params.idForm)

    return (
        <PaperBlock>
            {userMonitoryValues == null ? (
                <h1 className="font-bold">Carregando...</h1>
            ) : (
                <>
                    <h2
                        className={`text-2xl font-bold text-center text-slate-500 my-2 dark:text-slate-100`}
                    >
                        Monitoria {userMonitoryValues?.monitoring[0]?.id_form} ({userMonitoryValues?.monitoring[0]?.monitoring_date})
                    </h2>
                    <h2
                        className={`text-base font-bold text-center text-slate-500 mb-5 dark:text-slate-100`}
                    >
                        {userMonitoryValues?.monitoring[0].Creditor} | {userMonitoryValues.monitoring[0].Ocorrence} | {userMonitoryValues.monitoring[0].Description}
                    </h2>

                    <div className="relative shadow-md sm:rounded-lg mb-2 overflow-x-hidden">
                        <table
                            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                        >
                            <thead
                                className="text-sm text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400"
                            >
                                <tr>
                                    <th scope="col" className="px-6 py-3"> Negociador </th>
                                    <th scope="col" className="px-6 py-3"> Avaliador </th>
                                    <th scope="col" className="px-6 py-3"> Nota de Negociação </th>
                                    <th scope="col" className="px-6 py-3"> Nota de Comportamento </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    className="bg-slate-100 border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        <span className="mr-1">{userMonitoryValues?.monitoring[0]?.negotiator_name}</span>
                                        {userMonitoryValues?.monitoring[0]?.negotiator_last_name}
                                    </td>
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        <span className="mr-1">{userMonitoryValues?.monitoring[0]?.evaluator_name}</span>
                                        {userMonitoryValues?.monitoring[0]?.evaluator_last_name}
                                    </td>
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        {userMonitoryValues?.monitoring[0]?.negotiator_note}
                                    </td>
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        {userMonitoryValues?.monitoring[0]?.behavioral_note}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className={`text-black/80 font-bold text-lg dark:text-slate-200 px-4`}>
                        Negociação
                    </h2>

                    <div
                        className={`p-2 w-full flex items-start gap-2 justify-between px-4 overflow-y-auto h-full max-h-fit overflow-hidden`}
                    >
                        <div
                            className={`flex-1 flex flex-col gap-2 overflow-y-auto h-full max-h-full overflow-hidden`}
                        >
                            {userMonitoryValues?.questions.length > 0 ? (
                                <>
                                    {userMonitoryValues?.questions.map((item, index) => {

                                        if (index % 2 == 1) {
                                            return
                                        }

                                        return (
                                            <article
                                                key={index}
                                                className={`${item?.subquestions != null
                                                    ? "flex-col items-start gap-2"
                                                    : "flex-col items-center gap-2"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex items-center justify-between p-2 border border-slate-200 rounded-md`}
                                                >
                                                    <p
                                                        className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                    >
                                                        {item.question}
                                                    </p>

                                                    {item.subquestions == null && (
                                                        <span
                                                            className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                        >
                                                            {item.answer == true ? "Sim" : "Não"}
                                                        </span>
                                                    )}

                                                </div>

                                                {item.subquestions != null && item.subquestions.map((item, index) => {

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`flex items-center justify-between p-2 border border-slate-300 rounded-md ml-8 bg-slate-100 dark:bg-slate-500`}
                                                        >
                                                            <p
                                                                className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                            >
                                                                {item.subquestion}
                                                            </p>

                                                            <span
                                                                className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                            >
                                                                {item.answer == true ? "Sim" : "Não"}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </article>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Não foi possível achar as questões de negociação</p>
                            )}
                        </div>

                        <div
                            className={`flex-1 flex flex-col gap-2 overflow-y-auto h-full max-h-full overflow-hidden`}
                        >
                            {userMonitoryValues?.questions.length > 0 ? (
                                <>
                                    {userMonitoryValues?.questions.map((item, index) => {

                                        if (index % 2 == 0) {
                                            return
                                        }

                                        return (
                                            <article
                                                key={index}
                                                className={`${item?.subquestions != null
                                                    ? "flex-col items-start gap-2"
                                                    : "flex-col items-center gap-2"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex items-center justify-between p-2 border border-slate-200 rounded-md`}
                                                >
                                                    <p
                                                        className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                    >
                                                        {item.question}
                                                    </p>

                                                    {item.subquestions == null && (
                                                        <span
                                                            className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                        >
                                                            {item.answer == true ? "Sim" : "Não"}
                                                        </span>
                                                    )}

                                                </div>

                                                {item.subquestions != null && item.subquestions.map((item, index) => {

                                                    return (
                                                        <div
                                                            key={index}
                                                            className={`flex items-center justify-between p-2 border border-slate-300 rounded-md ml-8 bg-slate-100 dark:bg-slate-500`}
                                                        >
                                                            <p
                                                                className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                            >
                                                                {item.subquestion}
                                                            </p>

                                                            <span
                                                                className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                            >
                                                                {item.answer == true ? "Sim" : "Não"}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </article>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Não foi possível achar as questões de negociação</p>
                            )}
                        </div>
                    </div>

                    <h2 className={`text-black/80 font-bold text-lg dark:text-slate-200 px-4`}>
                        Comportamento
                    </h2>
                    <div className="p-2 w-full flex items-start gap-2 justify-between px-4 overflow-y-auto h-full max-h-fit overflow-hidden">
                        <div
                            className={`flex-1 flex flex-col gap-2 overflow-y-auto max-h-full h-full overflow-hidden`}
                        >
                            {userMonitoryValues?.behavioral.length > 0 ? (
                                <>
                                    {userMonitoryValues?.behavioral.map((item, index) => {

                                        if (index % 2 == 1) {
                                            return
                                        }

                                        return (
                                            <article
                                                key={index}
                                                className={`${item?.subquestions != null
                                                    ? "flex-col items-start gap-2"
                                                    : "flex-col items-center gap-2"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex items-center justify-between p-2 border border-slate-200 rounded-md`}
                                                >
                                                    <p
                                                        className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                    >
                                                        {item.question}
                                                    </p>

                                                    <span
                                                        className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                    >
                                                        {item.answer == true ? "Sim" : "Não"}
                                                    </span>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Não foi possível achar as questões de comportamento</p>
                            )}
                        </div>

                        <div
                            className={`flex-1 flex flex-col gap-2 overflow-y-auto max-h-full h-full overflow-hidden`}
                        >
                            {userMonitoryValues?.behavioral.length > 0 ? (
                                <>
                                    {userMonitoryValues?.behavioral.map((item, index) => {

                                        if (index % 2 == 0) {
                                            return
                                        }

                                        return (
                                            <article
                                                key={index}
                                                className={`${item?.subquestions != null
                                                    ? "flex-col items-start gap-2"
                                                    : "flex-col items-center gap-2"
                                                    }`}
                                            >
                                                <div
                                                    className={`flex items-center justify-between p-2 border border-slate-200 rounded-md`}
                                                >
                                                    <p
                                                        className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                    >
                                                        {item.question}
                                                    </p>

                                                    <span
                                                        className={`font-medium text-md text-black/80 dark:text-slate-50`}
                                                    >
                                                        {item.answer == true ? "Sim" : "Não"}
                                                    </span>
                                                </div>
                                            </article>
                                        )
                                    })}
                                </>
                            ) : (
                                <p>Não foi possível achar as questões de comportamento</p>
                            )}
                        </div>
                    </div>

                    <div className={`flex items-end h-full w-full gap-2`}>
                        <FieldForm
                            label="observation"
                            name="Observação:"
                            obrigatory={false}
                            styles={`w-full h-full flex flex-col items-start justify-start font-medium mx-4`}
                        >
                            <textarea
                                name="observation"
                                id="observation"
                                disabled
                                value={userMonitoryValues?.monitoring[0]?.observation}
                                className={`font-medium my-1 w-full border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 p-2 pb-20 dark:bg-slate-600 h-48 print:overflow-hidden`}
                                required
                            />
                        </FieldForm>

                    </div>
                    <div className="flex w-full items-start justify-start my-5">
                        <div className="w-1/2 flex flex-col justify-start items-center">
                            <p className="font-bold mb-2">Assinatura do operador</p>
                            <div className="w-[320px] h-[20px] border-b-[2px] border-b-black"></div>
                        </div>
                        <div className="w-1/2 flex flex-col justify-start items-center">
                            <p className="font-bold mb-2">Assinatura do supervisor</p>

                            <div className="w-[320px] h-[20px] border-b-[2px] border-b-black"></div>
                        </div>
                    </div>
                    <CallPrinter />
                </>
            )}
        </PaperBlock>
    )
}
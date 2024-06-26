import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { IDialogMonitoryUserProps } from "@/interfaces/monitoring/realized/IDialogMonitoryUser";

export function DialogMonitoryUser({ userMonitoryValues, closeDialogMonitory, audio, loadingAudio }: IDialogMonitoryUserProps) {
    return (
        <>
            {userMonitoryValues == null ? (
                <h1 className="font-bold">Carregando...</h1>
            ) : (
                <>
                    <h2
                        className={`text-2xl font-bold text-center text-slate-500 my-2 mb-8 dark:text-slate-100`}
                    >
                        Monitoria {userMonitoryValues?.monitoring[0]?.id_form}
                    </h2>

                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-2">
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
                                    <th scope="col" className="px-6 py-3"> Credor </th>
                                    <th scope="col" className="px-6 py-3"> Ocorrência </th>
                                    <th scope="col" className="px-6 py-3"> Fase </th>
                                    <th scope="col" className="px-6 py-3"> Data </th>
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
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        {userMonitoryValues?.monitoring[0]?.Creditor}
                                    </td>
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        {userMonitoryValues?.monitoring[0]?.Ocorrence}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold dark:text-slate-50">
                                        {userMonitoryValues?.monitoring[0]?.Description}
                                    </td>
                                    <td className="px-6 py-4 text-base font-semibold dark:text-slate-50">
                                        {userMonitoryValues?.monitoring[0]?.monitoring_date}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div
                        className={`p-2 w-full flex items-start gap-2 justify-between px-4 overflow-y-auto max-h-[25rem] h-fit`}
                    >
                        <div
                            className={`flex-1 flex flex-col gap-2 overflow-y-auto max-h-[20rem] h-fit`}
                        >
                            {userMonitoryValues?.questions.length > 0 ? (
                                <>
                                    <h2 className={`text-black/80 font-bold text-lg dark:text-slate-200`}>
                                        Negociação
                                    </h2>

                                    {userMonitoryValues?.questions.map((item, index) => {

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
                            className={`flex-1 flex flex-col gap-2 overflow-y-auto max-h-[20rem] h-fit`}
                        >
                            {userMonitoryValues?.behavioral.length > 0 ? (
                                <>
                                    <h2 className={`text-black/80 font-bold text-lg dark:text-slate-200`}>
                                        Comportamento
                                    </h2>

                                    {userMonitoryValues?.behavioral.map((item, index) => {
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
                            styles={`w-full h-full flex flex-col items-start justify-start font-medium`}
                        >
                            <textarea
                                name="observation"
                                id="observation"
                                disabled
                                value={userMonitoryValues?.monitoring[0]?.observation}
                                className={`font-medium my-1 w-full border-2 border-slate-400 rounded-md outline-none focus:border-blue-500 p-2 dark:bg-slate-600 h-28`}
                                required
                            />
                        </FieldForm>

                        <FieldForm
                            label="audio"
                            name="Audio da monitoria:"
                            obrigatory={false}
                            styles={`w-2/3 h-full flex flex-col items-start justify-start font-medium`}
                        >
                            {loadingAudio ? (
                                <p className="font-bold">Carregando...</p>
                            ) : (
                                <>
                                    {audio == null ? (
                                        <p>Nenhum aúdio disponível</p>
                                    ) : (
                                        <audio controls className={`w-full mb-2`} id="audio">
                                            <source src={audio} type="audio/wav" />
                                            Your browser does not support the audio element.
                                        </audio>
                                    )}
                                </>
                            )}
                        </FieldForm>
                    </div>

                    <div className={`flex justify-end`}>
                        <Button
                            type="button"
                            text="Voltar"
                            styles={`w-fit h-fit border-blue-400 bg-blue-400 text-white hover:bg-blue-500
                                focus:bg-blue-400 text-md px-2 py-2
                            `}
                            OnClick={() => closeDialogMonitory()}
                        />
                    </div>
                </>
            )}
        </>
    )
}
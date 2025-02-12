import { Button } from "@/components/Button";
import { FieldForm } from "@/components/FieldForm";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { IDialogFeedbackProps } from "@/interfaces/monitoring/feedback/container-feedback-list/dialog/IDialogFeedback";

export function DialogFeedback({ feedbacks, feedbackIndex, dialogRef }: IDialogFeedbackProps) {

    return (
        <>
            {feedbacks.length > 0 && (
                <>
                    <h2 className="font-semibold text-center text-xl">Feedback #{feedbacks[feedbackIndex].Id_Feedback}</h2>

                    <section className={`relative w-full max-h-[24.8rem] overflow-y-auto`}>
                        <table className="w-full mx-auto my-4">
                            <thead className="bg-gray-200 dark:bg-zinc-800">
                                <tr>
                                    <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tl-md">
                                        Data do Feedback
                                    </th>
                                    <th className="font-semibold text-sm p-2 dark:text-white/80">
                                        Operador
                                    </th>
                                    <th className="font-semibold text-sm p-2 dark:text-white/80 rounded-tr-md">
                                        Responsável do Feedback
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="items-center p-1 bg-slate-100">
                                <tr
                                    className="odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800"
                                >
                                    <td className="text-center text-sm p-2">{feedbacks[feedbackIndex].Created_At}</td>
                                    <td className="text-center text-sm p-2">{feedbacks[feedbackIndex].Operator}</td>
                                    <td className="text-center text-sm p-2" >{feedbacks[feedbackIndex].Responsable}</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="mb-5">
                        <FieldForm
                            name="Motivo:"
                        >
                            <Input 
                                id="reason"
                                name="reason"
                                type="text"
                                value={feedbacks[feedbackIndex].Reason}
                                disabled={true}
                            />
                        </FieldForm>

                        <FieldForm
                            name="Observações:"
                        >
                            <TextArea 
                                name="observation"
                                onForm={false}
                                value={feedbacks[feedbackIndex].Observation}
                                disabled={true}
                                styles="min-h-[200px] max-h-[300px]"
                            />
                        </FieldForm>
                    </section>

                    <Button
                        type="button"
                        text="Fechar"
                        styles="float-right w-fit text-sm py-2 text-red-400 border-red-400 hover:bg-red-400 focus:bg-red-400"
                        OnClick={() => dialogRef.current?.close()}
                    />
                </>
            )}
        </>
    )

}
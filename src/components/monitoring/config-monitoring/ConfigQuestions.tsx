import { IConfigQuestionsProps } from "@/interfaces/monitoring/config-monitoring/IConfigQuestions";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function ConfigQuestions({ questionsList }: IConfigQuestionsProps) {

    return (
        <>
            <div className={`flex items-center justify-center gap-10`}>
                <button
                    onClick={() => /*allDroppedQuestionsToOtherSide()*/ console.log("a")}
                    title="Mover tudo para o lado direito"
                >
                    <FontAwesomeIcon icon={faAnglesRight} className="text-blue-500 cursor-pointer hover:text-white duration-200 hover:bg-blue-400 p-2 rounded-full" />
                </button>

                <button
                    onClick={() => /*allQuestionsToOtherSide()*/ console.log("b")}
                    title="Mover tudo para o lado esquerdo"
                >
                    <FontAwesomeIcon icon={faAnglesLeft} className="text-blue-500 cursor-pointer hover:text-white duration-200 hover:bg-blue-400 p-2 rounded-full" />
                </button>
            </div>
            <div className={`flex justify-between gap-2 p-2 px-4`}>
                <article 
                    className={`w-1/2 h-[25rem] p-2 gap-2 border border-slate-300 rounded-md flex flex-col overflow-y overflow-x-hidden
                        ${
                            ""
                          /*droppedQuestions?.length > 0 || behavioralAll?.length > 0
                            ? "items-start"
                            : "items-center justify-center"*/
                        }
                    `}
                >
                    {questionsList.questions.length > 0 || questionsList.questions ? (
                        <p>a</p>
                    ) : (
                        <p>b</p>
                    )}
                </article>
            </div>
        </>
    )
}
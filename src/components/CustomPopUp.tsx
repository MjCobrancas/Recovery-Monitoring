import { ICustomPopUp } from "@/interfaces/components/CustomPopUp";
import { faCircleCheck, faCircleExclamation, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons/faCircleInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function CustomPopUp({ data }: ICustomPopUp) {

    return (
        <div
            className={`flex items-center w-full max-w-xs p-4 mb-4 rounded-lg
            
                ${data.type == "info" ? "bg-blue-50 text-blue-500" : ""}
                ${data.type == "error" ? "bg-red-50 text-red-500" : ""}
                ${data.type == "warning" ? "bg-amber-50 text-yellow-500" : ""}
                ${data.type == "success" ? "bg-green-50 text-green-500 dark:text-white" : ""}

                bg-white shadow dark:bg-zinc-700`
            }
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8
                text-green-500 bg-green-100 rounded-lg
                
                    ${data.type == "success" ? `text-green-500 bg-green-300 dark:bg-green-800 dark:text-green-200` : ""}

                    ${data.type == "info" ? `text-blue-500 bg-blue-300 dark:bg-blue-800 dark:text-blue-200` : ""}

                    ${data.type == "warning" ? `text-yellow-500 bg-yellow-300` : ""}

                    ${data.type == "error" ? `text-red-500 bg-red-300` : ""}      
                `}
            >
                {data.type == "success" && (
                    <FontAwesomeIcon icon={faCircleCheck} />
                ) || data.type == "info" && (
                    <FontAwesomeIcon icon={faCircleInfo} />
                ) || data.type == "warning" && (
                    <FontAwesomeIcon icon={faTriangleExclamation} />
                ) || data.type == "error" && (
                    <FontAwesomeIcon icon={faCircleExclamation} />
                )}
            </div>
            <span className="ml-3 text-sm font-bold text-ellipsis overflow-hidden ...">
                {data.description}
            </span>
        </div>
    )
}
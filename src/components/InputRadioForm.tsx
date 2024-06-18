import { IInputRadioForm } from "@/interfaces/components/InputRadioForm";

export function InputRadioForm({ answer }: IInputRadioForm) {

    return (
        <div
            className={answer == true
                ? "w-4 h-4 rounded-full border-[1px] border-blue-500 flex justify-center items-center"
                : "w-4 h-4 border-gray-500 border-[1px] rounded-full"}
            >
            <div
                className={answer == true ? "w-[10px] h-[10px] bg-blue-500 rounded-full" : ""}
            ></div>
        </div>
    )

}

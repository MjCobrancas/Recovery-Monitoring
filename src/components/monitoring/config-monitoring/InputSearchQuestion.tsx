import { Input } from "@/components/Input"
import { ChangeEvent } from "react"

export function InputSearchQuestion({ inputText, setInputTextValue }: any) {

    function handleInputSearch(event: ChangeEvent<HTMLInputElement>) {
        setInputTextValue(event.target.value)
    }
    
    return (
        <div className="flex flex-col mr-4">
            <label htmlFor="inputText">
                Pesquisar perguntas:
            </label>
            <Input 
                id="inputText"
                name="inputText"
                type="text"
                value={inputText}
                onForm={false}
                onInput={(event: ChangeEvent<HTMLInputElement>) => handleInputSearch(event)}
                styles="w-fit"
            />
        </div>
    )

}
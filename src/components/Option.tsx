import { IOption } from "@/interfaces/components/Option";

export function Option({ id, firstValue, value, selectedValue }: IOption) {

    return (
        <option
            id={id}
            value={value}
            selected={selectedValue == value}
            className={`
                font-semibold text-[--text-label-login] dark:bg-[--bg-dark-options]
                dark:text-[--text-input-dark]
            `}
        >
            {firstValue ? firstValue : value}

        </option>
    )
}
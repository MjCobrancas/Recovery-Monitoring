"use client"

import { ChevronsUpDown } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ISelectOperatorsProps } from "@/interfaces/monitoring/graphics/operators-graphics/ISelectOperators"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"

export function SelectOperators({ operators, handleCheckAllOperators, changeOperatorStatus, checkAllOperators, disableAllButtons, foundOperators }: ISelectOperatorsProps) {
    const [open, setOpen] = useState(false)

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between self-end py-[20px] border-[2px] border-slate-200 disabled:bg-slate-200 disabled:border-slate-400 disabled:cursor-not-allowed disabled:text-gray-600 dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:[color-scheme:dark] dark:text-[--text-input-dark] dark:disabled:bg-slate-500 dark:disabled:text-gray-200"
                    disabled={disableAllButtons || !foundOperators}
                >
                    Lista de operadores
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0 dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:[color-scheme:dark] dark:text-[--text-input-dark]">
                <Command className="dark:bg-[--bg-dark-options] dark:border-[--border-dark] dark:[color-scheme:dark] dark:text-[--text-input-dark]">
                    <CommandInput placeholder="Procurar operador..." />
                    <div className="flex justify-between items-center gap-1 px-2 mt-2">
                        <p className="text-sm">Marcar todos:</p>
                        <button
                            type="button"
                            className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                                "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": checkAllOperators,
                                "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !checkAllOperators
                            })}
                            onClick={() => handleCheckAllOperators(checkAllOperators)}
                        >
                            {checkAllOperators && (
                                <FontAwesomeIcon icon={faCheck} />
                            )}
                        </button>
                    </div>
                    <CommandList>
                        <CommandEmpty className="px-2 text-xs mt-2">Operadores não encontrados.</CommandEmpty>
                        <CommandGroup className="mt-5">
                            {operators.map((operator, index) => (
                                <CommandItem
                                    key={index}
                                    value={operator.Operator_Name}
                                    className="flex justify-between items-center px-1 text-xs"
                                >
                                    {operator.Operator_Name}
                                    <button
                                        type="button"
                                        className={classNames("w-6 h-6 flex justify-center items-center py-1 duration-300 text-white rounded-md border-[2px]", {
                                            "bg-emerald-400 border-emerald-400 hover:bg-emerald-500 hover:border-emerald-500 dark:bg-emerald-500 dark:border-emerald-500 dark:hover:bg-emerald-600 dark:hover:border-emerald-600": operator.Status,
                                            "border-slate-300 hover:bg-slate-200 dark:border-slate-400 dark:hover:bg-slate-400": !operator.Status
                                        })}
                                        onClick={() => changeOperatorStatus(operator.Status, index)}
                                    >
                                        {operator.Status && (
                                            <FontAwesomeIcon icon={faCheck} />
                                        )}
                                    </button>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

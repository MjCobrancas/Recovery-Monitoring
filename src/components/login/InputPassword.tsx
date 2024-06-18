'use client'

import { useState } from "react";
import { Input } from "../Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { IInputPassword } from "@/interfaces/components/InputPassword";

export function InputPassword({ loginError, register, watch, errors}: IInputPassword) {
    const [typePassword, setTypePassword] = useState<"password" | "text">("password")

    function changeValueOfShowPassword() {
        setTypePassword((state) => state == "password" ? "text" : "password")
    }

    return (
        <>
            <Input
                type={typePassword == "text" ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Digite sua senha"
                required={false}
                maxlength={60}
                value={watch("password")}
                styles={`mt-1 p-3 border-2 rounded outline-none transition
                        font-semibold text-[--text-label-login]
                        duration-200 w-full placeholder:text-[--text-placeholder-login] placeholder:font-medium focus:border-[--focus-input-login]
                        ${loginError || errors.password
                            ? "border-[--label-color-error] dark:border-[--label-color-error]"
                            : ""
                        }`}
                onForm={true}
                register={register}
            />

            <div className={`absolute top-[2.7rem] right-5`}>
                {typePassword == "text" ? (
                    <button
                        onClick={changeValueOfShowPassword}
                        title="Senha Desprotegida"
                        type="button"
                    >
                        <FontAwesomeIcon icon={faEye} className="text-gray-400 cursor-pointer" />
                    </button>
                ) : (
                    <button
                        onClick={changeValueOfShowPassword}
                        title="Senha Protegida"
                        type="button"
                    >
                        <FontAwesomeIcon icon={faEyeSlash} className="text-gray-400 cursor-pointer" />
                    </button>
                )}

            </div>
        </>
    )

}
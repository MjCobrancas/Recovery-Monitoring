'use server'

import { RespCep } from "@/interfaces/Generics"

export async function validCEP(cep: number) {

    const validCEPResp = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(async (resp) => {
            const response = await resp.json()

            return {
                value: response
            } as RespCep
        })
        .catch((err) => {
            console.log("Cep inválido", err)
            return {
                value: {}
            } as RespCep
        })

    return validCEPResp
}

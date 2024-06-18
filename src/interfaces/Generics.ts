interface IResult {
    [x: string]: any
}

interface IResultDefaultResponse<T> {
    data?: T
    status?: boolean
}

interface ITokenUserInitialValues {
    idUser: number
    accessToken: string
    refreshToken: string
}

interface ITokenUserValues {
    id: number
    name: string
    permission: number
    position: string
    username: string
    iat: number
    exp: number
}

interface CepValues {
    bairro: string
    postalCode: string
    ddd: string
    localidade: string
    logradouro: string
    uf: "AC" | "AL" | "AP" | "AM" | "BA" | "CE" | "DF" | "ES" | "GO" | "MA" | "MT" | "MS" | "MG" | "PA" | "PB" | "PR" | "PE" | "PI" | "RJ" | "RN" | "RS" | "RO" | "RR" | "SC" | "SP" | "SE" | "TO"
    erro?: boolean
    cep?: string
}

interface RespCep {
    value?: CepValues
}


export type { IResult, IResultDefaultResponse, ITokenUserValues, ITokenUserInitialValues, CepValues, RespCep }
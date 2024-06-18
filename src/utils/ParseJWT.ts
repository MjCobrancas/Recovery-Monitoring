export function parseJWT(token: string) {
    try {
        return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString())
    } catch (error) {
        return null
    }
}
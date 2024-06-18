export function validDate(data: string, minimunAge?: boolean) {
    let validData = true
    let splited = data.split("-")

    if (minimunAge) {
        if (new Date().getFullYear() - Number(splited[0]) < 14) {
            validData = false
        }
    }

    if (
        Number(splited[0]) < 1920 ||
        Number(splited[0]) > new Date().getFullYear()
    ) {
        validData = false
    }

    if (Number(splited[1]) > 12 || Number(splited[1]) < 1) {
        validData = false
    }

    if (Number(splited[2]) < 1 || Number(splited[2]) > 31) {
        validData = false
    }

    return validData
}
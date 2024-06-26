"use server"

export async function getAudioOfMonitory(id: string) {
    try {
        const resp = await fetch(
            `${process.env.BACKEND_DOMAIN}/download-gravacao/${String(id)}`,
            {
                method: "GET",
                headers: {
                    Accept: "audio/wav",
                },
            }
        )
            .then(async (response) => {
                return await response.blob();
            })
            .then(async (value) => {
                let arrayBuffer = await value.arrayBuffer();
                let object = {
                    file: Array.from(new Uint8Array(arrayBuffer)),
                    type: value.type,
                };

                return {
                    object,
                }
            });
        
        return resp
    } catch (error) {

        return null
    }
}

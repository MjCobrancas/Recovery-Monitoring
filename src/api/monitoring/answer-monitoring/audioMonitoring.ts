'use server'

import { ITokenUserInitialValues } from "@/interfaces/Generics";
import { GetUserToken } from "@/utils/GetUserToken";

export async function uploadAudioMonitoring(idForm: string, idUser: number, file: FormData) {
    const userParse: ITokenUserInitialValues = GetUserToken();
  
    console.log("IdForm:", idForm)
    console.log(idUser)
    console.log(file)
    
    const uploadAudio = await fetch(
        
      `${process.env.BACKEND_DOMAIN}/upload-gravacao/${idForm}/${idUser}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userParse.accessToken}`,
        },
        body: file,
      }
    )
      .then(async (resp) => {
        if (resp.status == 400) {
          return false
        }
  
        return true
      })
      .catch(() => {
        return false
      })
  
    return uploadAudio
  }
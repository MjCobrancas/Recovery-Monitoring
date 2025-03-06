import { getUserPermission } from "@/api/generics/getUserPermission";
import { Ancora } from "@/components/Ancora";
import { ContainerChangePassword } from "@/components/change-password/ContainerChangePassword";
import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";

export default async function Page() {

    const user = await getUserPermission()

    return (
        <PaperBlock styles="relative">
            <TextPrincipal text="Alterar senha do usuário" />

            <ContainerChangePassword user={user} />

            <Ancora title="Voltar" toGo="/" styles="absolute bottom-1 left-1 w-fit ml-1" />
        </PaperBlock>
    )

}
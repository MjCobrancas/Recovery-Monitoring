import { PaperBlock } from "@/components/PaperBlock";
import { TextPrincipal } from "@/components/TextPrincipal";
import Image from 'next/image';
import homeImage from "../../../public/loginMapadeGestao.svg";

export default function HomePage() {

    return (

        <PaperBlock styles={`h-full`}>
            <main className={`flex flex-col items-center justify-between h-full pb-8`}>
                <aside className={`flex flex-col items-center`}>
                    <TextPrincipal
                        text="Mapa de gestão 2.0 (in building)"
                        styles={`max-md:text-[2rem] text-black/80 mb-8 text-[2.5rem]`}
                    />

                    <p
                        className={`max-md:text-[1.5rem] max-md:leading-8 text-slate-400 text-2xl font-semibold max-w-lg text-center text-[1.5rem] text-`}
                    >
                        Mapa de gestão é um ambiente para gerenciar seu trabalho e facilitar sua rotina!
                    </p>
                </aside>

                <Image
                    src={homeImage}
                    alt="Imagem referente a tela inicial do projeto, contendo 3 pessoas em movendo um dashboard."
                    className={`max-w-lg max-md:w-5/6`}
                />
            </main>
        </PaperBlock>
    )
}


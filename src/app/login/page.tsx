import Image from "next/image";
import SignIn from "../../../public/sign-in.svg"
import { LoginForm } from "@/components/login/LoginForm";

export default function Home() {

    return (
        <div className={`flex items-center justify-between w-full h-screen`}>
            <div
                className={`flex flex-col justify-between h-full w-full mr-28 pb-10 max-[950px]:hidden`}
            >
                <p className={`text-[--text-white] text-3xl font-bold p-7 max-tablet:hidden`}>
                    Bem vindo!
                </p>

                <Image
                    src={SignIn}
                    alt="Imagem da tela de login para representar o login."
                    className={`ml-28 pr-8 w-[500px] max-[1200px]:ml-12 max-[1200px]:pr-0 max-[1200px]:pb-8`}
                />
            </div>

            <div
                className={`flex flex-col items-center bg-[--bg-white] dark:bg-[--bg-dark-main] p-4 w-full h-full relative rounded-tl-[50px] max-[950px]:rounded-tl-none`}
            >
                <h1
                    className={`text-[--text-title-login] text-[2.75rem] font-bold pb-[6rem] max-tablet:text-[2.4rem]`}
                >
                    Recovery Plus
                </h1>

                <LoginForm />
            </div>
        </div>
    );
}

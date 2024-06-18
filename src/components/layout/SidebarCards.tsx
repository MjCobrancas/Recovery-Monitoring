'use client'

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBars, faDumbbell, faHeart, faHouse, faListCheck } from "@fortawesome/free-solid-svg-icons";
import { secondRoutes, primaryRoutes } from "@/api/routes"
import { SecondRoutes, PrimaryRoutes } from "@/interfaces/IRoutes";
import { faWpforms } from "@fortawesome/free-brands-svg-icons";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import { ISidebarCards } from "@/interfaces/components/SidebarCards";
import Image from "next/image";

export function SidebarCards({ name, userName, position, userImage }: ISidebarCards) {
    const [showSideBar, setShowSideBar] = useState(false)

    function changeValueOfSideBar() {
        setShowSideBar((state) => !state)
    }

    return (
        <aside className={`fixed z-50`}>
                <div
                    className={`bg-[--bg-sidebar] z-50 dark:bg-[--bg-dark-sidebar] p-2 h-screen duration-300 absolute shadow-[0px_0px_15px_1px_rgba(0,0,0,0.5)]
                    ${showSideBar ? "w-64  left-[0rem]" : "w-64  left-[-15.5rem]"}`}
                >
                    <button
                        onClick={() => changeValueOfSideBar()}
                        className={`absolute top-14 right-[-1rem] text-[--text-white] bg-[--dark-blue] py-1 px-2 
        rounded-full hover:bg-blue-500 duration-200 ${showSideBar ? "" : `right-[-3.8rem]`
                            }`}
                        id="arrowButton"
                    >
                        {showSideBar ? (
                            <FontAwesomeIcon icon={faBars} />
                        ) : (
                            <FontAwesomeIcon icon={faArrowRight} />
                        )}
                    </button>

                    <header className={`flex gap-4 items-center w-full p-3 duration-300 mb-6`}>
                        <Image
                            className={`dark:bg-white rounded-full w-[4.5rem] h-[4.5rem] border-4 border-blue-400 object-cover`}
                            src={`${userImage}/get-image-users/${userName}.jpg`}
                            alt="Avatar do Usuário"
                            width={`${100}`}
                            height={100}
                        />
                        {showSideBar &&
                            <div className="w-36">
                                <p
                                    className={`font-semibold text-[--text-title-profile] dark:text-[--text-white] text-lg text-ellipsis overflow-hidden ...`}
                                >
                                    {name}
                                </p>
                                <span
                                    className={`text-[--text-subTitle-profile] font-bold text-ellipsis overflow-hidden ...`}
                                >
                                    {position}
                                </span>
                            </div>
                        }

                    </header>
                    <nav
                        className={`flex flex-col gap-1 p-3 scroll-smooth overflow-y-auto
                        scrollbar-thumb-slate-400 scrollbar-track-[--bg-dark-sidebar]
                        scrollbar-thin
                        h-[25rem]`}
                    >
                        {primaryRoutes.map((primaryRoute: PrimaryRoutes, index: number) => {
                            if (!primaryRoute.route) {
                                return (
                                    <details
                                        key={index}
                                        className={`relative before:duration-200 open:before:rotate-[225deg]
                                        before:absolute before:w-2 before:h-2 before:top-0 before:right-0 before:mt-3 before:mr-4 before:border-solid before:border-[--bg-login]
                                        before:dark:border-[--light-blue-opacity] before:border-t-0 before:border-r-2
                                        before:border-b-2 before:border-l-0 before:p-1 before:rotate-45
                                        `}
                                    >
                                        <summary
                                            className={`flex w-full font-bold text-[--bg-login]
                                            dark:text-[--light-blue-opacity] hover:bg-[--hover-light-route] dark:hover:bg-[--hover-dark-route] pr-2 rounded-md cursor-pointer`}
                                        >
                                            <span
                                                className={`w-[1rem] p-2 flex align-baseline items-center gap-3`}
                                            >
                                                {primaryRoute.name.includes("Gestão") && 
                                                    <FontAwesomeIcon icon={faListCheck}/>
                                                }
                                                {primaryRoute.name.includes("Coaching") && 
                                                    <FontAwesomeIcon icon={faWpforms}/>
                                                }
                                                {primaryRoute.name.includes("Monitoria") && 
                                                    <FontAwesomeIcon icon={faEye}/>
                                                }
                                                {primaryRoute.name.includes("Treinamento") && 
                                                    <FontAwesomeIcon icon={faDumbbell}/>
                                                }
                                                {primaryRoute.name}
                                            </span>
                                        </summary>

                                        {secondRoutes.map((secondRoute: SecondRoutes, index: number) => {
                                            if (Number(primaryRoute.level) === Number(secondRoute.level)) {
                                                return (
                                                    <Link 
                                                        key={index} 
                                                        onClick={() => changeValueOfSideBar()}
                                                        href={`${secondRoute.route}`}
                                                        className="flex items-center pl-12 gap-5 text-[--bg-login] text-sm font-bold h-12 w-full rounded-md hover:text-[--text-white] hover:bg-[--light-blue-opacity]
                                                        dark:hover:text-[--text-white] dark:text-[--light-blue-opacity]"
                                                    >
                                                        {secondRoute.name}
                                                    </Link>
                                                )
                                            }
                                        })}
                                    </details>
                                )
                            }

                            return (
                                <Link
                                    key={index}
                                    onClick={() => changeValueOfSideBar()}
                                    href={`${primaryRoute.route}`}
                                    className={`
                                            flex items-center gap-5 text-[--bg-login] text-md font-bold h-12 w-full rounded-md
                                            hover:text-[--text-white] hover:bg-[--light-blue-opacity]
                                            dark:hover:text-[--text-white] dark:text-[--light-blue-opacity]`}
                                >
                                    <span className={`w-[1rem] p-2`}>
                                        {primaryRoute.name.includes("Home") && (
                                            <FontAwesomeIcon icon={faHouse} />
                                        )}
                                    </span>

                                    {showSideBar && (
                                        <p>{primaryRoute.name}</p>
                                    )}

                                </Link>
                            )
                        }
                        )}



                    </nav>
                    <footer className="text-[--text-footer] bg-[--bg-white] dark:bg-[--bg-dark-sidebar] p-2 font-bold flex items-center justify-center gap-2 absolute bottom-0 left-0 w-full transition-all z-50">
                        <span>Feito com amor pela TI</span>
                        <FontAwesomeIcon icon={faHeart} />
                    </footer>
                </div>
            </aside>
    )
}
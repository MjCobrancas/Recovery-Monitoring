'use client'

import { ISelectGraphicsProps } from "@/interfaces/monitoring/graphics/select-graphics/ISelectGraphics"
import { ButtonGraphics } from "./ButtonGraphics"

export function SelectGraphics({ graphicType, setValueGraphicType }: ISelectGraphicsProps) {

    function handleSetGraphic(type: string) {
        setValueGraphicType(type)
    }

    return (
        <div className="h-[170px] mb-16 flex justify-between items-center gap-2 border-[1px] rounded-lg border-slate-200 mx-4">
            <div className="px-6">
                <h2 className="font-medium">Navegue entre as abas</h2>
                <p className="text-sm text-gray-500">Lista com os gráficos disponíveis na aplicação</p>
            </div>
            <div className="flex h-full">
                <ButtonGraphics
                    title="Gráficos do Credor"
                    description="Visualize o desempenho do Credor por ocorrência e fase filtrado por um período de tempo"
                    graphicType={graphicType}
                    setGraphicType={"graphic-creditor"}
                    OnClick={() => handleSetGraphic("graphic-creditor")}
                />

                <ButtonGraphics 
                    title="Gráficos dos Operadores"
                    description="Visualize o desempenho dos operadores por carteira"
                    graphicType={graphicType}
                    setGraphicType={"graphic-operators"}
                    OnClick={() => handleSetGraphic("graphic-operators")}
                />

                <ButtonGraphics 
                    title="Gráficos dos Supervisores"
                    description="Visualize a quantidade de Monitorias realizadas dos supervisores por carteira"
                    graphicType={graphicType}
                    setGraphicType={"graphic-supervisors"}
                    OnClick={() => handleSetGraphic("graphic-supervisors")}
                />
            </div>

        </div>
    )

}
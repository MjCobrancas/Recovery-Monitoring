"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { ISupervisorGraphicsProps } from "@/interfaces/monitoring/graphics/supervisor-graphics/ISupervisorGraphics"
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { useState } from "react"
import { Cell, Label, Pie, PieChart } from "recharts"

export function SupervisorGraphics({ graphicsSupervisor, countCreditor, setValueCountCreditor, graphicsChartConfig }: ISupervisorGraphicsProps) {

    const [minimumNumber, setMinimumNumber] = useState(0)
    const [maxNumber, setMaxNumber] = useState(4)

    function handleDiscount() {
        setMinimumNumber(state => state - 4)
        setMaxNumber(state => state - 4)
    }

    function handleMaxCount() {
        setMinimumNumber(state => state + 4)
        setMaxNumber(state => state + 4)
    }

    return (
        <>
            {graphicsSupervisor != null && (
                <Card className="flex flex-col mx-4 mb-4 rounded-t-none dark:bg-[--bg-dark-sidebar]">
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col w-[250px] justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Monitorias realizadas - {graphicsSupervisor.creditors[countCreditor].name}</CardTitle>
                            <CardDescription>Quantidade de monitorias realizadas por supervisores {countCreditor == 0 ? "em todas as carteiras" : `na carteira da ${graphicsSupervisor.creditors[countCreditor].name}`}</CardDescription>
                        </div>
                        <div className="relative grid grid-cols-5 h-[150px] overflow-auto overflow-x-hidden">
                            <button
                                className="absolute z-40 left-1 top-1/2 -translate-y-1/2 bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 duration-300"
                                disabled={minimumNumber == 0}
                                onClick={handleDiscount}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                            </button>
                            {graphicsSupervisor.creditors.map((creditor, index) => {

                                if (index < minimumNumber || index > maxNumber) {
                                    return
                                }

                                return (
                                    <button
                                        key={index}
                                        data-active={index == countCreditor}
                                        className={classNames("relative w-[200px] border-l-[1px] z-30 flex flex-1 flex-col justify-center gap-1 py-8 text-left data-[active=true]:bg-muted/50", {
                                            "border-r-[1px]": graphicsSupervisor.creditors.length - 1 == index && index < maxNumber 
                                        })}
                                        onClick={() => setValueCountCreditor(index)}
                                    >
                                        <span className="w-full px-9 text-center text-base font-semibold leading-none sm:text-base">
                                            {creditor.name}: <span className="text-sm font-normal">{creditor.total}</span>
                                        </span>
                                    </button>
                                )
                            })}
                            <button
                                className="absolute z-40 right-1 top-1/2 -translate-y-1/2 bg-blue-400 text-white px-2 py-1 rounded-md hover:bg-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 duration-300"
                                disabled={maxNumber >= graphicsSupervisor.creditors.length}
                                onClick={handleMaxCount}
                            >
                                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                            </button>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={graphicsChartConfig!}
                            className="mx-auto aspect-square w-[300px] max-h-[350px]"
                        >
                            <PieChart
                                data={graphicsSupervisor.creditors[countCreditor].supervisor}
                                dataKey="quantity"
                            >
                                <ChartTooltip
                                    content={
                                        <ChartTooltipContent
                                            className="w-[210px]"
                                            labelFormatter={() => {
                                                return `Monitorias realizadas`
                                            }}
                                        />
                                    }
                                />
                                <Pie
                                    data={graphicsSupervisor.creditors[countCreditor].supervisor}
                                    dataKey="quantity"
                                    innerRadius={60}
                                    strokeWidth={5}
                                    labelLine={false}
                                    label={({ payload, ...props }) => {
                                        return (
                                            <text
                                                cx={props.cx}
                                                cy={props.cy}
                                                x={props.x}
                                                y={props.y}
                                                textAnchor={props.textAnchor}
                                                dominantBaseline={props.dominantBaseline}
                                                fill="hsla(var(--foreground))"
                                                className={classNames("text-xs p-2", {
                                                    "hidden w-0 h-0": payload.quantity == 0
                                                })}
                                            >
                                                {payload.quantity}
                                            </text>
                                        )
                                    }}
                                    nameKey="name"
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {graphicsSupervisor.creditors[countCreditor].total.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={(viewBox.cy || 0) + 24}
                                                            className="fill-muted-foreground"
                                                        >
                                                            Monitorias
                                                        </tspan>
                                                    </text>
                                                )
                                            }
                                        }}
                                    />

                                    {graphicsSupervisor.creditors[countCreditor].supervisor.map((item, index) => {
                                        return (
                                            <Cell
                                                key={index}
                                                fill={item.color}
                                            />
                                        )
                                    })}

                                </Pie>

                                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                            </PieChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            )}
        </>
    )
}

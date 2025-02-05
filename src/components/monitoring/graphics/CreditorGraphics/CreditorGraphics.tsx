"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { ICreditorGraphicsProps } from "@/interfaces/monitoring/graphics/creditor-graphics/ICreditorGraphics"
import classNames from "classnames"

const chartConfig = {
    views: {
        label: "Média da nota",
    },
    grade_value: {
        label: "Nota de negociação",
        color: "hsl(var(--chart-3))",
    },
    grade_value_behavioral: {
        label: "Nota comportamental",
        color: "hsl(var(--chart-2))",
    },
    quantity: {
        label: "Quantidade de Monitorias Realizadas",
        color: "#f59e0b"
    }
} satisfies ChartConfig

export function CreditorGraphics({ graphics, count, setCount }: ICreditorGraphicsProps) {

    return (
        <div className="px-4 pb-4">
            <Card className="rounded-tl-none rounded-tr-none dark:bg-[--bg-dark-sidebar]">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col w-[250px] justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Gráfico interativo - {graphics?.creditor.name}</CardTitle>
                        <CardDescription>
                            Mostrando a média das notas de negociação e comportamental por ocorrência e fase
                        </CardDescription>
                    </div>
                    <div className="grid grid-cols-5">
                        {graphics.creditor.ocorrences.map((ocorrence, index: number) => {
                            return (
                                <button
                                    key={index}
                                    data-active={index == count}
                                    className={classNames("flex flex-1 flex-col justify-center relative w-[200px] py-8 z-30 gap-1 border-l-[1px] text-left data-[active=true]:bg-muted/50", {
                                        "border-r-[1px]": index == graphics.creditor.ocorrences.length - 1 && index < 4
                                    })}
                                    onClick={() => setCount(index)}
                                >
                                    <span className="w-full text-center text-sm font-bold leading-none sm:text-sm">
                                        {ocorrence.name}
                                    </span>
                                    <span className="w-full text-center text-sm text-muted-foreground">
                                        Nota: <span className="text-base text-[#3b82f6]">{ocorrence.grade_value_average}</span>
                                    </span>
                                    <span className="w-full text-center text-sm text-muted-foreground">
                                        Nota: <span className="text-base text-[#10b981]">{ocorrence.grade_value_behavioral_average}</span>
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[350px] w-full"
                    >
                        <BarChart
                            data={graphics.creditor.ocorrences[count].agings}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                            barGap={24}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    return `Fase ${value}`
                                }}
                            />

                            <YAxis
                                domain={[0, 1000]}
                                tickCount={11}
                                padding={{ top: 20 }}
                                label={{ value: 'Média de nota da monitoria', angle: -90, position: 'insideBottomLeft' }}
                            />
                            <ChartTooltip
                                label={chartConfig}
                                content={
                                    <ChartTooltipContent
                                        className="w-[210px]"
                                        labelFormatter={(value) => {
                                            return `Fase: ${value}`
                                        }}
                                    />
                                }
                            />

                            <Bar dataKey={"grade_value"} fill={`#3b82f6`} barSize={10}>
                                <LabelList
                                    position="top"
                                    offset={2}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                            <Bar dataKey={"grade_value_behavioral"} fill={`#10b981`} barSize={10}>
                                <LabelList
                                    position="top"
                                    offset={2}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                            <Bar dataKey={"quantity"} fill={`#f59e0b`} barSize={0} />

                            <ChartLegend content={<ChartLegendContent />} />
                        </BarChart>

                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

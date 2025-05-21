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
import { IOperatorGraphicTotalProps } from "@/interfaces/monitoring/graphics/operator-graphic/IOperatorGraphicTotal"

const chartConfig = {
    views: {
        label: "Média da nota",
    },
    Grade_Value: {
        label: "Nota de negociação",
        color: "hsl(var(--chart-3))",
    },
    Grade_Value_Behavioral: {
        label: "Nota comportamental",
        color: "hsl(var(--chart-2))",
    },
    Count: {
        label: "Quantidade de Monitorias Realizadas",
        color: "#f59e0b"
    }
} satisfies ChartConfig

export function OperatorGraphicTotal({ graphics }: IOperatorGraphicTotalProps) {

    return (
        <div className="px-4 pb-4">
            <Card className="rounded-tl-none rounded-tr-none dark:bg-[--bg-dark-sidebar]">
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col w-[250px] justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Gráfico de média geral do operador {graphics[0].Name}</CardTitle>
                        <CardDescription>
                            Média de todas as notas do operador em um período de tempo.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[350px] w-full"
                    >
                        <BarChart
                            data={graphics}
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
                                        labelFormatter={() => {
                                            return `Notas`
                                        }}
                                    />
                                }
                            />

                            <Bar dataKey={"Grade_Value"} fill={`#3b82f6`} barSize={10}>
                                <LabelList
                                    position="top"
                                    offset={2}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                            <Bar dataKey={"Grade_Value_Behavioral"} fill={`#10b981`} barSize={10}>
                                <LabelList
                                    position="top"
                                    offset={2}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                            <Bar dataKey={"Count"} fill={`#f59e0b`} barSize={0} />

                            <ChartLegend content={<ChartLegendContent />} />
                        </BarChart>

                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IOperatorGraphicsProps } from "@/interfaces/monitoring/graphics/operators-graphics/IOperatorGraphics";
import classNames from "classnames";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

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

export function OperatorsGraphics({ graphics, countOcorrence, countAging, handleSetCount }: IOperatorGraphicsProps) {

    return (
        <>
            {graphics != null && (
                <div className="px-4 pb-4">
                    <Card className="rounded-tl-none rounded-tr-none dark:bg-[--bg-dark-sidebar]">
                        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                            <div className="flex flex-1 flex-col w-[250px] justify-center gap-1 px-6 py-5 sm:py-6">
                                <CardTitle>Gráfico interativo - {graphics.creditor.name}</CardTitle>
                                <CardDescription>
                                    Mostrando a média das notas de negociação e comportamental dos operadores em relação a carteira {graphics.creditor.name}
                                </CardDescription>
                            </div>
                            <div className="grid grid-cols-5">
                                {graphics.creditor.ocorrences.map((ocorrence, indexOcorrence: number) => {
                                    return (
                                        <>
                                            {ocorrence.agings.map((aging, indexAging) => {
                                                return (
                                                    <button
                                                        key={indexAging}
                                                        data-active={indexOcorrence == countOcorrence && indexAging == countAging}
                                                        className={classNames("relative w-[200px] h-[150px] z-30 flex flex-1 flex-col justify-center gap-1 border-[1px] border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6", {
                                                            "border-[1px] border-b": graphics.creditor.ocorrences.length > 5
                                                        })}
                                                        onClick={() => handleSetCount(indexOcorrence, indexAging)}
                                                    >
                                                        <span className="text-xs text-muted-foreground">
                                                            {ocorrence.name}
                                                        </span>
                                                        <span className="text-sm font-bold leading-none sm:text-sm">
                                                            Fase: {aging.name}
                                                        </span>
                                                    </button>
                                                )
                                            })}
                                        </>
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
                                    data={graphics.creditor.ocorrences[countOcorrence].agings[countAging].operators}
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
                                            return `${value}`
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
                                                    return `Média de ${value}`
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
                                    <Bar dataKey={"quantity"} fill="#f59e0b" barSize={0} />

                                    <ChartLegend content={<ChartLegendContent />} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
            )}

        </>
    )

}

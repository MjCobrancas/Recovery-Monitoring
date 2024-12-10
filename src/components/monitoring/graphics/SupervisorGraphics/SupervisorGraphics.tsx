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
import classNames from "classnames"
import { Cell, Label, Pie, PieChart } from "recharts"

export function SupervisorGraphics({ graphicsSupervisor, countCreditor, setValueCountCreditor, graphicsChartConfig }: ISupervisorGraphicsProps) {

    return (
        <>
            {graphicsSupervisor != null && (
                <Card className="flex flex-col mx-4 mb-4 rounded-t-none dark:bg-[--bg-dark-sidebar]">
                    <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                        <div className="flex flex-1 flex-col w-[250px] justify-center gap-1 px-6 py-5 sm:py-6">
                            <CardTitle>Monitorias realizadas - {graphicsSupervisor.creditors[countCreditor].name}</CardTitle>
                            <CardDescription>Quantidade de monitorias realizadas por supervisores {countCreditor == 0 ? "em todas as carteiras" : `na carteira da ${graphicsSupervisor.creditors[countCreditor].name}`}</CardDescription>
                        </div>
                        <div className="grid grid-cols-5 max-h-[280px] overflow-auto overflow-x-hidden">
                            {graphicsSupervisor.creditors.map((creditor, index) => {
                                return (
                                    <button
                                        key={index}
                                        data-active={index == countCreditor}
                                        className={classNames("relative w-[200px] z-30 flex flex-1 flex-col justify-center gap-1 border-[1px] border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6", {
                                            "border-[1px] border-b": graphicsSupervisor.creditors.length > 5
                                        })}
                                        onClick={() => setValueCountCreditor(index)}
                                    >
                                        <span className="text-xs text-muted-foreground">
                                            {creditor.name}
                                        </span>
                                        <span className="text-base font-bold leading-none sm:text-base">
                                            Monitorias realizadas: <span className="text-xl">{creditor.total}</span>
                                        </span>
                                    </button>
                                )
                            })}
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

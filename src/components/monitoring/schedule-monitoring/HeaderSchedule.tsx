import { Ancora } from "@/components/Ancora";
import { ISchedulesData } from "@/interfaces/components/monitoring/schedule-monitoring/ISchedules";

export function HeaderSchedule({ schedules }: ISchedulesData) {

    return (
        <div className={`flex items-end justify-between ml-2`}>
            <div className={`flex items-end gap-2`}>
                <Ancora
                    title="Prepare sua monitoria"
                    toGo="/monitoring/config-monitoring"
                    styles={`border border-blue-500 rounded-md bg-transparent
                            duration-200 px-2 py-2 text-blue-500 hover:bg-blue-500 dark:bg-transparent
                            dark:hover:bg-blue-500
                            w-fit text-md
                    `}
                />
                <p className={`bg-slate-300 rounded-md p-2 font-medium text-black/80`}>
                    Negociadores: 
                    <span className={`ml-2 bg-slate-200 px-2 py-1 rounded-md`}>
                        {schedules.quantity.negotiators}
                    </span>
                </p>

                <p className={`bg-slate-300 rounded-md p-2 font-medium text-black/80`}>
                    Agendas:
                    <span className={`ml-2 bg-slate-200 px-2 py-1 rounded-md`}>
                        {schedules.data.length}
                    </span>
                </p>

                <p className={`bg-red-400 rounded-md p-2 font-medium text-black/80 text-white`}>
                    Atraso:
                    <span className={`text-black/80 py-1 px-2 rounded-md ml-2 bg-red-100`}>
                        {schedules.quantity.late}
                    </span>
                </p>

                <p className={`bg-green-400 rounded-md p-2 font-medium text-black/80 text-white`}>
                    Em dia:
                    <span className={`bg-green-100 ml-2 text-black/80 py-1 px-2 rounded-md`}>
                        {schedules.quantity.today}
                    </span>
                </p>

                <p className={`bg-blue-400 rounded-md p-2 font-medium text-black/80 text-white`}>
                    Futuro:
                    <span className={`bg-blue-100 ml-2 text-black/80 py-1 px-2 rounded-md`}>
                        {schedules.quantity.future}
                    </span>
                </p>
            </div>
        </div>
    )
}
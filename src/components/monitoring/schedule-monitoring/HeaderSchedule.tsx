import { Ancora } from "@/components/Ancora";
import { ISchedulesData } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";

export function HeaderSchedule({ schedules }: ISchedulesData) {

    return (
        <div className={`flex items-end justify-between ml-2`}>
            <div className={`flex items-end gap-2`}>
                <p className={`bg-slate-300 dark:bg-zinc-700 dark:text-white rounded-md p-2 font-medium text-black/80`}>
                    Negociadores: 
                    <span className={`ml-2 bg-slate-200 dark:bg-zinc-500 px-2 py-1 rounded-md`}>
                        {schedules.quantity.negotiators}
                    </span>
                </p>

                <p className={`bg-slate-300 dark:bg-zinc-700 dark:text-white rounded-md p-2 font-medium text-black/80`}>
                    Agendas:
                    <span className={`ml-2 bg-slate-200 dark:bg-zinc-500 px-2 py-1 rounded-md`}>
                        {schedules.data.length}
                    </span>
                </p>

                <p className={`bg-red-400 dark:bg-red-500 rounded-md p-2 font-medium text-black/80 text-white`}>
                    Atraso:
                    <span className={`text-black/80 py-1 px-2 rounded-md ml-2 dark:text-white bg-red-100 dark:bg-red-400`}>
                        {schedules.quantity.late}
                    </span>
                </p>

                <p className={`bg-green-400 dark:bg-green-500 rounded-md p-2 font-medium text-black/80 text-white`}>
                    Em dia:
                    <span className={`bg-green-100 dark:bg-green-400 ml-2 text-black/80 py-1 px-2 rounded-md dark:text-white `}>
                        {schedules.quantity.today}
                    </span>
                </p>

                <p className={`bg-blue-400 dark:bg-blue-500 rounded-md p-2 font-medium text-black/80 text-white`}>
                    Futuro:
                    <span className={`bg-blue-100 dark:bg-blue-400 ml-2 text-black/80 py-1 px-2 rounded-md dark:text-white`}>
                        {schedules.quantity.future}
                    </span>
                </p>
            </div>
        </div>
    )
}
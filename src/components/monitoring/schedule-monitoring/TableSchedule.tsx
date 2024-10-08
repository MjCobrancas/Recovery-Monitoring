import { IScheduleTable } from "@/interfaces/monitoring/schedule-monitoring/ISchedules";
import { getDateOfString } from "@/utils/GetDateOfString";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function TableSchedule({ schedules, filter }: IScheduleTable) {

    return (
        <table className={`w-[96vw] px-4 mx-auto my-4`}>
            <thead className={`bg-gray-200 dark:bg-zinc-800`}>
                <tr>
                    <th className={`font-semibold p-2 dark:text-white/80 rounded-tl-md`}>
                        Negociador
                    </th>

                    <th className={`font-semibold p-2 dark:text-white/80`}>
                        Credor
                    </th>

                    <th className={`font-semibold p-2 dark:text-white/80`}>
                        Ocorrência
                    </th>

                    <th className={`font-semibold p-2 dark:text-white/80`}>
                        Fase
                    </th>

                    <th className={`font-semibold p-2 dark:text-white/80`}>
                        Data
                    </th>

                    <th className={`font-semibold p-2 dark:text-white/80 rounded-tr-md`}>
                        Ações
                    </th>
                </tr>
            </thead>
            <tbody className={`items-center p-1 bg-slate-100`}>
                {filter.length != 0 ? filter.map((filtered, i) => {
                    return (
                        <tr key={i} className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}>
                            <td className={`p-2 text-center`}>
                                {filtered.Name + " " + filtered.Last_Name}
                            </td>

                            <td className={`p-2 text-center`}>
                                {filtered.Creditor}
                            </td>

                            <td className={`p-2 text-center`}>
                                {filtered.Ocorrence}
                            </td>

                            <td className={`p-2 text-center`}>
                                {filtered.Description}
                            </td>

                            <td className={`p-2 text-center`}>
                                {getDateOfString(filtered.Date)}
                            </td>

                            <td className={`p-2 text-center`}>
                                <Link
                                    className={`bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 duration-100 text-white rounded-md px-2 py-[5px]`}
                                    href={`/monitoring/answer-monitoring/${filtered.id_quantity}`}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} fontSize={14} />
                                </Link>
                            </td>
                        </tr>
                    )
                })
                    : schedules.data.map((schedule, i) => {
                        return (
                            <tr key={i} className={`odd:bg-gray-100 even:bg-gray-200 dark:odd:bg-zinc-700 dark:even:bg-zinc-800`}>
                                <td className={`p-2 text-center`}>
                                    {schedule.Name + " " + schedule.Last_Name}
                                </td>

                                <td className={`p-2 text-center`}>
                                    {schedule.Creditor}
                                </td>

                                <td className={`p-2 text-center`}>
                                    {schedule.Ocorrence}
                                </td>

                                <td className={`p-2 text-center`}>
                                    {schedule.Description}
                                </td>

                                <td className={`p-2 text-center`}>
                                    {getDateOfString(schedule.Date)}
                                </td>

                                <td className={`p-2 text-center`}>
                                    <Link
                                        className={`bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600 duration-100 text-white rounded-md px-2 py-[5px]`}
                                        href={`/monitoring/answer-monitoring/${schedule.id_quantity}`}
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} fontSize={14} />
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
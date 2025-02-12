'use server'

import { revalidateTag } from "next/cache"

export async function revalidateMonitoringFeedbacksTags() {
    revalidateTag("get-monitoring-feedbacks")
    revalidateTag("get-responsables-on-monitoring-feedbacks")
}

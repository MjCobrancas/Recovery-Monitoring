declare namespace NodeJS {
    interface ProcessEnv {
        FRONTEND_DOMAIN: string
        MANAGEMENT_DOMAIN: string
        COACHING_DOMAIN: string
        WORKOUT_DOMAIN: string
        TASKS_DOMAIN: string
        BACKEND_DOMAIN: string
        HOST: string
        PORT: number
        ORIGIN: string
        PUBLIC_IMAGES: string
        PUBLIC_USERS: string
        PUBLIC_BACKEND_DOMAIN: string
        BODY_SIZE_LIMIT: number
    }
}
export interface PrimaryRoutes {
    name: string
    level: number
    permissions: number[]
    route?: string
}

interface SecondRoutes {
    name: string
    level: number
    route: string
    permissions: number[]
}

interface ActionRoutes {
    level: number
    permissions: number[]
    route: string
}

export type { SecondRoutes, ActionRoutes }
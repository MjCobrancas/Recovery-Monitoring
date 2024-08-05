import { ActionRoutes, SecondRoutes, PrimaryRoutes } from "@/interfaces/IRoutes"

export const primaryRoutes: Array<PrimaryRoutes> = [
    {
      name: "Home",
      level: 1,
      permissions: [1, 2, 3, 4, 5, 6],
      route: "/",
    },
    {
      name: "Coaching",
      level: 2,
      permissions: [1, 2, 3, 4, 5],
    },
    {
      name: "Gestão",
      level: 6,
      permissions: [1, 2, 3, 4],
    },
    {
      name: "Monitoria",
      level: 8,
      permissions: [1, 2, 3, 4],
    },
    {
      name: "Treinamento",
      level: 9,
      permissions: [1],
    },
  ]

export const secondRoutes: Array<SecondRoutes> = [
    {
        name: "Home",
        level: 1,
        permissions: [1, 2, 3, 4, 5, 6],
        route: "/"
    },
    {
        name: "DashCoaching",
        level: 2,
        permissions: [1, 2, 3, 4, 5],
        route: "/coaching/dash-coaching",
    },
    {
        name: "Formulário",
        level: 2,
        permissions: [1, 2, 3, 4, 5],
        route: "/coaching/form-coaching",
    },
    {
        name: "Lista",
        level: 2,
        permissions: [1, 2, 3, 4, 5],
        route: "/coaching/list-coaching",
    },
    {
        name: "Usuários",
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/user",
    },
    {
        name: "Cadastros",
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register",
    },
    {
        name: "Agenda",
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/schedule-monitoring",
    },
    {
        name: "Monitorias realizadas",
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/realized",
    },
    {
        name: "Integrantes",
        level: 9,
        permissions: [1],
        route: "/workout/members"
    },
    {
        name: "Instruções",
        level: 9,
        permissions: [1],
        route: "/workout/instructions"
    },
    {
        name: "Avaliações realizadas",
        level: 9,
        permissions: [1],
        route: "/workout/realized"
    }
]

export const actionRoutes: Array<ActionRoutes> = [
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/user/register",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/user/quick-register"
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/user/edit",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/user/quick-edit"
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/user/delete",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/creditors",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/notes",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/agendas",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/ocorrences",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/questions",
    },
    {
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/config-monitoring"
    },
    {
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/answer-monitoring"
    },

    {
        level: 9,
        permissions: [1],
        route: "/workout/creditor-content"
    },

    {
        level: 9,
        permissions: [1],
        route: "/workout/operator-content"
    },

    {
        level: 9,
        permissions: [1],
        route: "/workout/change-phase"
    },

    {
        level: 9,
        permissions: [1],
        route: "/workout/global-content"
    },

    {
        level: 9,
        permissions: [1],
        route: "/workout/prepare-avaliation"
    }
]

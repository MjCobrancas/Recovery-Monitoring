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
      permissions: [0],
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
        name: "Tarefas",
        level: 10,
        permissions: [1, 2, 3, 4]
    },
    {
      name: "Treinamento",
      level: 9,
      permissions: [1, 2, 3, 4, 5, 6],
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
        permissions: [0],
        route: "/coaching/dash-coaching",
    },
    {
        name: "Formulário",
        level: 2,
        permissions: [0],
        route: "/coaching/form-coaching",
    },
    {
        name: "Lista",
        level: 2,
        permissions: [0],
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
        name: "Head Count",
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/head-count"
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
        name: "Gráficos de monitoria",
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/graphics"
    },
    {
        name: "Lista de Feedbacks",
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/feedback-list"
    },
    {
        name: "Integrantes",
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/members"
    },
    {
        name: "Instruções",
        level: 9,
        permissions: [1, 2, 3, 4, 5, 6],
        route: "/workout/instructions"
    },
    {
        name: "Avaliações realizadas",
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/realized"
    },
    {
        name: "Monitorar tarefas",
        level: 10,
        permissions: [1, 2],
        route: "/tasks/monitoring"
    },
    {
        name: "Lista de tarefas do usuário",
        level: 10,
        permissions: [1, 2, 3, 4],
        route: "/tasks/user"
    },
    {
        name: "Histórico de tarefas",
        level: 10,
        permissions: [1, 2, 3, 4],
        route: "/tasks/history"
    },
    {
        name: "Monitorar solicitações de recurso",
        level: 10,
        permissions: [1],
        route: "/tasks/appeal-monitoring"
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
        permissions: [1],
        route: "/register/creditors",
    },
    {
        level: 6,
        permissions: [1],
        route: "/register/notes",
    },
    {
        level: 6,
        permissions: [1],
        route: "/register/agendas",
    },
    {
        level: 6,
        permissions: [1, 2, 3, 4],
        route: "/register/ocorrences",
    },
    {
        level: 6,
        permissions: [1],
        route: "/register/questions",
    },
    {
        level: 8,
        permissions: [1],
        route: "/monitoring/config-monitoring"
    },
    {
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/answer-monitoring"
    },
    {
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/loose-monitoring"
    },

    {
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/realized-print"
    },

    {
        level: 8,
        permissions: [1, 2, 3, 4],
        route: "/monitoring/create-feedback"
    },
    {
        level: 2,
        permissions: [1, 2, 3, 4, 5],
        route: "/coaching/print-coaching"
    },

    {
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/creditor-content"
    },

    {
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/operator-content"
    },

    {
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/change-phase"
    },

    {
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/global-content"
    },

    {
        level: 9,
        permissions: [1, 2, 3, 4],
        route: "/workout/prepare-avaliation"
    }
]

interface ICustomPopUp {
  data: {
    description: string
    type: 'success' | 'info' | 'warning' | 'error'
  }
}

export type { ICustomPopUp }
export interface Person {
  id: string
  name: string
  votes: number
  voted: boolean
}

export interface AppNotification {
  message: string
  hideAfter: number
  type?: 'success' | 'error'
}

export interface AppStoreState {
  voters: Person[]
  candidates: Person[]
  notifications: AppNotification[]
  totalVotes: number
}

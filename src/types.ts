export interface Status {
  id: number
  name: string
}

export interface User {
  id: number
  name: string
  email: string
}

export interface Lead {
  id: number
  name: string
  price: number
  responsibleUserId: number
  statusId: number
  pipelineId: number
  createdAt: number
  user: User
  status: Status
}

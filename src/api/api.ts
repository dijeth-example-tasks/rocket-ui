import type { Lead, User } from '@/types.js'
import { httpClient } from './httpClient/httpClient'

export interface ApiResponse<T> {
  data?: T
  error?: any
}

const request = async <T>(
  method: 'get' | 'post',
  path: string,
  body?: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await httpClient[method](path, body)
    return { data: response.data }
  } catch (error) {
    return { error }
  }
}

export const getAllLeads = async (): Promise<ApiResponse<Lead[]>> => {
  return request('get', '/all-leads?limit=50')
}

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  return request('get', '/all-users?limit=50')
}

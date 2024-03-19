import type { Lead } from '@/types.js'
import { httpClient } from './httpClient/httpClient'

export interface ApiResponse<T> {
  data?: T
  error?: any
}

export type ApiFunction<T> = () => Promise<ApiResponse<T>>

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

export const getAllLeads = async (query?: string): Promise<ApiResponse<Lead[]>> => {
  return request('get', `/leads?limit=50${query ? `&query=${query}` : ''}`)
}

import { useProgress } from '../plugins/progress'
import { ref, type Ref } from 'vue'
import type { ApiResponse } from '@/api/api'

export type TApiFunction<T> = (...args: any[]) => Promise<ApiResponse<T>>
export type TApiReturn<T> = {
  isLoading: Ref<boolean>
  result: Ref<T | undefined>
  error: Ref<any>
  request: TApiFunction<T>
}
export const API_NATIVE_RESPONSE = 'API_NATIVE_RESPONSE'

/**
 * Компосабл для выполнения запросов в компонентах
 * Добавляет опциональную интеграцию с прогресс баром
 * Возвращает реактивные переменные с результатом
 */
export function useApi<T>(
  apiFunction: TApiFunction<T>,
  { showProgress = false, progressKey = '' } = {},
): TApiReturn<T> {
  const result = ref<T>()
  const error = ref<any>()
  const isLoading = ref<boolean>(false)
  const progress = useProgress()
  const progressId = progressKey || Date.now().toString()

  const startProgress = () => {
    if (progress && showProgress) {
      progress.start(progressId)
    }
  }
  const finishProgress = () => {
    if (progress && showProgress) {
      progress.finish(progressId)
    }
  }
  const failProgress = () => {
    if (progress && showProgress) {
      progress.fail()
    }
  }

  const request = async (...args: any[]) => {
    isLoading.value = true
    result.value = undefined
    error.value = undefined
    startProgress()
    const response = await apiFunction(...args)
    if (response.error) {
      error.value = response.error
      failProgress()
    } else {
      result.value = response.data
      finishProgress()
    }
    isLoading.value = false

    return response
  }

  return {
    request,
    result,
    error,
    isLoading,
  }
}

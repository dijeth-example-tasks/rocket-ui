<template>
  <a-table
    :columns="columns"
    :data-source="data"
    :scroll="{ x: 200 }"
    :pagination="{
      size: 'small',
      position: ['bottomCenter'],
    }"
  >
    <template #emptyText> <component :is="lodaingStatus" /></template>

    <template #bodyCell="{ column, record }">
      <slot :column="column" :record="record" />
    </template>
  </a-table>
</template>

<script lang="ts" setup generic="T">
import { type ApiFunction } from '@/api/api'
import { useApi } from '@/composables/useApi'
import { computed, onMounted } from 'vue'
import EmptyData from '../components/EmptyData.vue'
import LoadingData from '../components/LoadingData.vue'
import LoadingError from '../components/LoadingError.vue'
import type { ATableColumn } from '@/types'

const props = defineProps<{
  apiFunction: ApiFunction<T>
  columns: ATableColumn[]
}>()

const { request, result, isLoading, error } = useApi(props.apiFunction)

const lodaingStatus = computed(() => {
  if (error.value) {
    return LoadingError
  }

  return isLoading.value ? LoadingData : EmptyData
})

const data = computed(() => {
  if (!result.value) {
    return []
  }

  return result.value
})

onMounted(request)
</script>

<template>
  <a-table :columns="columns" :data-source="data" :pagination="false">
    <template #emptyText> <component :is="lodaingStatus" /></template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>
      <template v-else-if="column.key === 'email'">
        {{ record.email }}
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { getAllUsers } from '@/api/api'
import { useApi } from '@/composables/useApi'
import { computed, onMounted } from 'vue'
import EmptyData from '../components/EmptyData.vue'
import LoadingData from '../components/LoadingData.vue'
import LoadingError from '../components/LoadingError.vue'

const { request, result, isLoading, error } = useApi(getAllUsers, { showProgress: true })
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

const columns = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
]
</script>

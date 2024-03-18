<template>
  <a-table :columns="columns" :data-source="data">
    <template #emptyText> <component :is="lodaingStatus" /></template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>
      <template v-else-if="column.key === 'price'">
        {{ formatPrice(record.price) }}
      </template>
      <template v-else-if="column.key === 'status'">
        {{ record.status.name }}
      </template>
      <template v-else-if="column.key === 'user'">
        {{ record.user.name }}
      </template>
      <template v-else-if="column.key === 'createdAt'">
        {{ formatDate(record.createdAt) }}
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { getAllLeads } from '@/api/api'
import { useApi } from '@/composables/useApi'
import { computed, onMounted } from 'vue'
import EmptyData from '../components/EmptyData.vue'
import LoadingData from '../components/LoadingData.vue'
import LoadingError from '../components/LoadingError.vue'

const { request, result, isLoading, error } = useApi(getAllLeads, { showProgress: true })
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

const formatDate = (unixTime: number) => new Date(unixTime * 1000).toString().split('GMT')[0]
const formatPrice = (price: number) =>
  `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.`

onMounted(request)

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Бюджет',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Ответственный',
    key: 'user',
    dataIndex: 'user',
  },
  {
    title: 'Дата создания',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
]
</script>

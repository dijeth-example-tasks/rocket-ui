<template>
  <TableLoader :columns="columns" :api-function="apiFn" :key="query">
    <template #default="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>
      <template v-else-if="column.key === 'price'">
        {{ formatPrice(record.price) }}
      </template>
      <template v-else-if="column.key === 'status'">
        <LeadStatus :status="record.status.name" />
      </template>
      <template v-else-if="column.key === 'user'">
        {{ record.user.name }}
      </template>
      <template v-else-if="column.key === 'createdAt'">
        {{ formatDate(record.createdAt) }}
      </template>
    </template>
  </TableLoader>
</template>

<script lang="ts" setup>
import { getAllLeads } from '@/api/api'
import TableLoader from '@/components/TableLoader.vue'
import LeadStatus from '@/components/LeadStatus.vue'
import { useStore } from '@/composables/useStore'
import type { ATableColumn } from '@/types'
import { computed } from 'vue'

const formatDate = (unixTime: number) =>
  new Date(unixTime * 1000).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })
const formatPrice = (price: number) =>
  `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.`

const { query } = useStore()
const apiFn = computed(() => () => getAllLeads(query.value))

const columns: ATableColumn[] = [
  {
    width: 200,
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    width: 200,
    title: 'Бюджет',
    dataIndex: 'price',
    key: 'price',
  },
  {
    width: 200,
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
  },
  {
    width: 200,
    title: 'Ответственный',
    key: 'user',
    dataIndex: 'user',
  },
  {
    width: 200,
    title: 'Дата создания',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
]
</script>

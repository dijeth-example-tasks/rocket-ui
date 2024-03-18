<template>
  <TableLoader :columns="columns" :api-function="getAllLeads">
    <template #default="{ column, record }">
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
  </TableLoader>
</template>

<script lang="ts" setup>
import { getAllLeads } from '@/api/api'
import TableLoader from '@/components/TableLoader.vue'
import type { ATableColumn } from '@/types'

const formatDate = (unixTime: number) => new Date(unixTime * 1000).toString().split('GMT')[0]
const formatPrice = (price: number) =>
  `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} руб.`

const columns: ATableColumn[] = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
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

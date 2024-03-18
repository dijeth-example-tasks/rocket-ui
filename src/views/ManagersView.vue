<template>
  <TableLoader :columns="columns" :api-function="getAllUsers">
    <template #default="{ column, record }">
      <template v-if="column.key === 'name'">
        {{ record.name }}
      </template>
      <template v-else-if="column.key === 'email'">
        {{ record.email }}
      </template>
    </template>
  </TableLoader>
</template>

<script setup lang="ts">
import { getAllUsers } from '@/api/api'
import TableLoader from '@/components/TableLoader.vue'
import type { ATableColumn } from '@/types'
const columns: ATableColumn[] = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    ellipsis: true,
  },
  {
    title: 'E-mail',
    dataIndex: 'email',
    key: 'email',
  },
]
</script>

<style scoped></style>

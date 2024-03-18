<template>
  <div style="background: #ececec; padding: 30px">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#00b96b',
        },
      }"
    >
      <a-card style="width: 100%" title="Тестовое задание 'Интегация с AmoCrm'">
        <template #extra>
          <UiSearch @search="handleSearch" />
        </template>
        <LeadsView />
      </a-card>
    </a-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from './composables/useStore'
import UiSearch from './components/UiSearch.vue'
import LeadsView from './views/LeadsView.vue'

const { query } = useStore()

const handleSearch = (value: string) => {
  query.value = value
}
</script>

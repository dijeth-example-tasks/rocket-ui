<template>
  <a-config-provider
    :theme="{
      algorithm: themeAlgorithm,
    }"
  >
    <Layout>
      <div style="padding: 30px; min-height: 100vh">
        <ThemeSwitcher @switch="handleThemeSwitch" />
        <a-card style="overflow-x: auto" title="Тестовое задание 'Интегация с AmoCrm'">
          <template #extra>
            <UiSearch @search="handleSearch" />
          </template>
          <LeadsView />
        </a-card>
      </div>
    </Layout>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { useStore } from './composables/useStore'
import UiSearch from './components/UiSearch.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import LeadsView from './views/LeadsView.vue'
import { Layout, theme } from 'ant-design-vue'
import { ref } from 'vue'

const { query } = useStore()
const themeAlgorithm = ref(theme.darkAlgorithm)

const handleThemeSwitch = (value: string) => {
  themeAlgorithm.value = value === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm
}
const handleSearch = (value: string) => {
  query.value = value
}
</script>

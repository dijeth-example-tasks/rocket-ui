<template>
  <div style="background: #ececec; padding: 30px">
    <a-config-provider
      :theme="{
        token: {
          colorPrimary: '#00b96b',
        },
      }"
    >
      <a-card
        style="width: 100%"
        title="Тестовое задание 'Интегация с AmoCrm'"
        :tab-list="tabList"
        :active-tab-key="route.name"
        @tabChange="onTabChange"
      >
        <template #customTab="item">
          <span>
            <AuditOutlined v-if="item.key === 'leads'" />
            <TeamOutlined v-else />
            {{ item.tab }}
          </span>
        </template>
        <template #extra>
          <UiSearch @search="handleSearch" />
        </template>
        <RouterView #default="{ Component }">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </a-card>
    </a-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { AuditOutlined, TeamOutlined } from '@ant-design/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from './composables/useStore'
import UiSearch from './components/UiSearch.vue'

const tabList = [
  {
    key: 'leads',
    tab: 'Leads',
  },
  {
    key: 'managers',
    tab: 'Managers',
  },
]

const router = useRouter()
const route = useRoute()
const { query } = useStore()

const handleSearch = (value: string) => {
  query.value = value
}

const onTabChange = (value: string) => {
  router.push({ name: value })
}
</script>

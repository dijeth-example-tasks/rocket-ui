<template>
  <span style="display: flex">
    <WarningTwoTone
      v-show="searchInner && !search"
      two-tone-color="red"
      style="margin-right: 10px"
    />
    <a-input v-model:value="searchInner" @input="inputHandler" placeholder="Поиск">
      <template #suffix>
        <SearchOutlined />
      </template>
    </a-input>
  </span>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { WarningTwoTone, SearchOutlined } from '@ant-design/icons-vue'
import { debounce } from '@/utils'

const searchInner = ref<string>('')
const search = computed(() => (searchInner.value.length >= 3 ? searchInner.value : ''))
const emit = defineEmits(['search'])

const inputHandler = debounce(() => {
  emit('search', search.value)
}, 700)
</script>

<style scoped></style>

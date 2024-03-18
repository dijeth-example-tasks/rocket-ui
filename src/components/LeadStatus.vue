<template>
  <a-tag :color="color">{{ status }}</a-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ status: string }>()
const color = computed(() => {
  if (/успешн/i.test(props.status)) {
    return 'green'
  }

  if (/не реализ/.test(props.status)) {
    return 'volcano'
  }

  if (/Согласование договора/.test(props.status)) {
    return 'yellow'
  }

  return 'blue'
})
</script>

<style scoped></style>

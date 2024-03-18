<template>
  <a-empty :image="simpleImage" description="Loading error" />
</template>
<script lang="ts" setup>
import { Empty } from 'ant-design-vue'
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>

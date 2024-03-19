<template>
  <span
    class="theme-switcher"
    :style="{ color: switchValue ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' }"
  >
    <SunIcon style="margin: 10px; width: 1em; height: 1em" />
    <a-switch v-model:checked="switchValue" />
    <MoonIcon style="margin: 10px; width: 1em; height: 1em" />
  </span>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import SunIcon from './icons/SunIcon.vue'
import MoonIcon from './icons/MoonIcon.vue'

const getStoredValue = (): boolean => {
  const storedValue = localStorage.getItem('dark')
  if (!storedValue) {
    return true
  }

  return storedValue === 'true' ? true : false
}
const storeSwitchValue = (value: boolean) => {
  localStorage.setItem('dark', value ? 'true' : 'false')
}

const emit = defineEmits(['switch'])
const switchValue = ref(getStoredValue())

watchEffect(() => {
  storeSwitchValue(switchValue.value)
  emit('switch', switchValue.value === true ? 'dark' : 'light')
})
</script>

<style scoped>
.theme-switcher {
  display: flex;
  align-items: center;
  justify-content: end;
  width: 100%;
  margin-bottom: 20px;
  font-size: 1.5em;
}
</style>

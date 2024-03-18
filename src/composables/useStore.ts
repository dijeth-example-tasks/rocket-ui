import { ref } from 'vue'

const query = ref<string>('')

export const useStore = () => ({
  query,
})

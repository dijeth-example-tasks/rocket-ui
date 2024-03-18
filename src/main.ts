import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { createProgress } from './plugins/progress'

createApp(App).use(router).use(createProgress()).mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// Firebase
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './config/firebase'
import {plugin, defaultConfig} from '@formkit/vue'
import config from '../formkit.config.js'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})
app.use(plugin, defaultConfig(config))
app.use(router)

app.mount('#app')

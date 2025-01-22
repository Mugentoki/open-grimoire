import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import routes from './router/routes';
import './assets/scss/main.scss'
import App from './App.vue'

import type { Router } from 'vue-router';

const pinia = createPinia();
const router: Router = createRouter({
    history: createMemoryHistory(),
    routes,
})
const app = createApp(App);

pinia.use(piniaPluginPersistedstate);

app.use(pinia)
app.use(router)
app.mount('#app')
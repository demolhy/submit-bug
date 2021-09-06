import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import installElementPlus from './plugins/element'
import store from './store'

const app = createApp(App)

installElementPlus(app)

app.use(Router).use(store).mount('#app')

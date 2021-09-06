import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import installElementPlus from './plugins/element'
import store from './store'
import custom from './utils/data'

const app = createApp(App)

installElementPlus(app)

// 定义全局的时间转换
app.config.globalProperties.$filters = { custom }

app.use(Router).use(store).mount('#app')

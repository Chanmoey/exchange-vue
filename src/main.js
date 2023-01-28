import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from "mitt";
import {config} from "@/api/config";
import VertxEventBus from 'vue-vertx3-eventbus-client'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')

// app.use(VertxEventBus,
//     {
//         path: config.real_ws_remote.path,
//         port: config.real_ws_remote.port,
//         host: config.real_ws_remote.host
//     })

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.config.globalProperties.$bus = mitt();
// app.$eventBus.enableReconnect(true)

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './icon/index'

//导入组件库
import allComponents from '../packages/index'
//注入组件库
Vue.use(allComponents)

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

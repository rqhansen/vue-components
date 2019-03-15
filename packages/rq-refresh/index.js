import RqRefresh from './src/RqRefresh.vue'

//为组件提供install安装方法，供按需引入
RqRefresh.install = function(Vue) {
    Vue.component(RqRefresh.name, RqRefresh)
}

export default RqRefresh

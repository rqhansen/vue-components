import RqRefresh from './main'

//为指令添加install犯法，用于按需引入
function install(Vue) {
    Vue.directive('RqRefresh', RqRefresh)
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.vue)
}

RqRefresh.install = install

export default RqRefresh

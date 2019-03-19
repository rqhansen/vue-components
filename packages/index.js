import RqRefresh from './rq-refresh'

const components = {
    RqRefresh
}

const install = function(Vue) {
    if (install.installed) return
    Object.keys(components).forEach(key=>{
        Vue.component(key,components[key]);
    })
}

//判断是否直接引入
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    //导出的对象必须有install 才能被Vue.use()方法安装
    install,
    //具体的组件列表
    RqRefresh
}

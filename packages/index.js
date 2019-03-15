import rqRefresh from './rq-refresh'

//存储组件列表
const components = [rqRefresh]

//定义install方法，接收Vue作为参数。如果使用use注册插件，则所有组件将被注册
const install = function(Vue) {
    //判断是否安装
    if (install.installed) return

    //遍历注册全局组件
    components.map(component => Vue.component(component.name, component))
}

//判断是否直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    //导出的对象必须有install 才能被Vue.use()方法安装
    install,

    //具体的组件列表
    rqRefresh
}

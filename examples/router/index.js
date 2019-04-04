import Vue from 'vue'
import Router from 'vue-router'

const app = () => import(/*webpackChunkName: "recharge" */ '@/App.vue')
const refresh = () => import(/*webpackChunkName: "recharge" */ '@/view/refresh')
const notFound = () =>
    import(/*webpackChunkName: "recharge" */ '@/view/notFound')

Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/',
            name: 'app',
            component: app,
            redirect: 'home',
            children: [
                {
                    path: 'refresh',
                    name: 'refresh',
                    component: refresh
                }
            ]
        },
        {
            path: '*',
            name: 'notFound',
            component: notFound
        }
    ]
})

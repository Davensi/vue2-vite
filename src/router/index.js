import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' // 引入 Home页面组件
import Test from '../views/Test.vue' // 引入 Test页面组件

// 注册路由插件
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        // component: Home,
        redirect: "/home"
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,

    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
]

const router = new VueRouter({
    routes
})

export default router

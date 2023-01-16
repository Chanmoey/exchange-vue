import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from "@/views/Dashboard.vue";
import PwdSetting from "@/views/PwdSetting.vue";
import Transfer from "@/views/Transfer.vue";
import OrderQuery from "@/views/OrderQuery.vue";

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: Dashboard
            },
            {
                path: '/pwdSetting',
                name: 'pwdSetting',
                component: PwdSetting,
                meta: {requiredAuth: true}
            },
            {
                path: '/transfer',
                name: 'transfer',
                component: Transfer,
            },
            {
                path: '/orderQuery',
                name: 'orderQuery',
                component: OrderQuery,
            },
        ]
    },
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/404',
        component: () => import('../views/404.vue')
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiredAuth) {
        if (Boolean(sessionStorage.getItem('uid'))) {
            next()
        } else {
            next({
                path: '/'
            })
        }
    } else {
        next()
    }
})

export default router

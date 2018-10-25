import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Notfound from './views/404.vue'
import UserInfo from './views/UserInfo.vue'
import FundList from './views/FundList.vue'

// 二级路由
import Index from './views/Index.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                },
                {
                    path: '',
                    name: 'index',
                    component: Index
                },
                {
                    path: '/userInfo',
                    name: 'userInfo',
                    component: UserInfo
                },
                {
                    path: '/fundlist',
                    name: 'fundList',
                    component: FundList
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '*',
            name: '/404',
            component: Notfound
        }
    ]
});

// 全局守卫
router.beforeEach((to, from, next) => {
    let isLogin = localStorage.getItem('token') ? true : false;
    if(to.path == '/login' || to.path == '/register') {
        next()
    } else {
        isLogin ? next() : next('/login')
    }
})

export default router;
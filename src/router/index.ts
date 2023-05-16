import { createRouter, createWebHistory } from 'vue-router';
import { getCookie } from '@/utils/cookie';
import { ElMessage } from 'element-plus';

const home = () => import('@/views/main/index.vue');
const loginIndex = () => import('@/views/login/index.vue');
// const DevelopIcon = () => import('@/components/menu/developIcon.vue');
const homeIndex = () => import('@/views/main/home.vue');
const goodsList = () => import('@/views/goods/list.vue');
const OrderIndex = () => import('@/views/order/index.vue');
const UserIndex = () => import('@/views/users/index.vue');

const routes = [
    {
        path: '/',
        name: 'Login',
        component: loginIndex
    },
    {
        path: '/home',
        name: "Home",
        component: home,
        children: [
            {
                path: 'index',
                name: 'homeIndex',
                components: {
                    main: homeIndex
                }
            },
            {
                path: 'goods/list',
                name: 'goodsList',
                components: {
                    main: goodsList
                }
            },
            {
                path: 'orders',
                name: 'orders',
                components: {
                    main: OrderIndex
                }
            },
            {
                path: 'users',
                name: 'users',
                components: {
                    main: UserIndex
                }
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = getCookie('Token');

    if (token) {
        if (to.path === '/') {
            next('/home/index')
        } else {
            if (!token) {
                ElMessage.warning('登录信息已失效，请重新登录！');
                next('/');
            } else {
                next()
            }
        }
    } else {
        if (to.path !== '/') {
            ElMessage.warning('登录信息已失效，请重新登录！');
            next('/')
        } else {
            next()
        }
    }
})

export default router
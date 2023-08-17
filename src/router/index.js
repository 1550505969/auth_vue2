import VueRouter from "vue-router";
import Home from '../views/Home'
import User from '../views/User'
import Main from '../views/Main'
import Mall from '../views/Mall'
import PageOne from '../views/PageOne'
import PageTwo from '../views/PageTwo'
import Login from '../views/Login'

const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:Main,
            redirect: '/home',
            name:'Main',
            // children:[
                /* // 首页
                {
                    path:'home',
                    component:Home,
                    name:'home'
                },
                // 用户管理
                {
                    path:'user',
                    component:User,
                    name:'user'
                },
                // 商品管理
                {
                    path:'mall',
                    component:Mall,
                    name:'mall'
                },
                {
                    path:'page1',
                    component:PageOne,
                    name:'page1'
                },
                {
                    path:'page2',
                    component:PageTwo,
                    name:'page2'
                } */
            // ]
        },
        {
            path:'/login',
            component:Login,
            name:'login'
        }
    ]
})

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default router
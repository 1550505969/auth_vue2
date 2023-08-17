import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueRouter from 'vue-router';
import router from './router';

import store from './store'

import './api/mock'
import Cookie from 'js-cookie'

Vue.use(ElementUI);
Vue.use(VueRouter)

Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  const token = Cookie.get('token')
  if(!token && to.name !== 'login'){
    console.log('登录页');
    next({name:'login'})
  }else if(token && to.name === 'login'){
    console.log('首页');
    next({name:'home'})
  }else{
    console.log('其他');
    next()
  }
})

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "HelloWorld" */ "@/components/index.vue")
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () => import(/* webpackChunkName: "HelloWorld" */ "@/components/HelloWorld")
    },
    {
      path: '/GetList',
      name: 'GetList',
      component: () => import(/* webpackChunkName: "GetList" */ "@/components/GetList.vue")
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      path: "/404",
      name: "404",
      component: () => import(/* webpackChunkName: "404 */ "@/components/notFound.vue")
    }
  ]
})

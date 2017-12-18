import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chooseseatindex from '@/components/chooseseat/Chooseseatindex'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/ChooseSeat',
      name: 'ChooseSeat',
      component: Chooseseatindex
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chooseseatindex from '@/components/chooseseat/Chooseseatindex'
import Cityexchange from '@/components/cityexchangeTransition/cityExchangeIndex'

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
    },
    {
      path:'/cityexchange',
      name: 'cityexchange',
      component: Cityexchange
    }
  ]
})

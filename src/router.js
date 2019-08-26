import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from '@/views/home/home'
import Friends from '@/views/friend/friends.vue'
import Cart from '@/views/cart/cart.vue'
import Search from '@/views/search/search.vue'
import newslist from './views/home/list/newslist.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/friends',
      component: Friends
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/home/newslist',
      component: newslist
    }

  ]
})

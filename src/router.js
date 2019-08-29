import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Home from '@/views/home/home'
import Friends from '@/views/friend/friends.vue'
import Cart from '@/views/cart/cart.vue'
import Search from '@/views/search/search.vue'
import newslist from '@/views/home/list/newslist.vue'
import newsinfo from '@/views/home/list/newsinfo/newsinfo.vue'
import photolist from '@/views/home/photolist/photolist.vue'
import photoinfo from '@/views/home/photolist/photoinfo/photoinfo.vue'
import goodslist from './views/home/goods/goodslist.vue'
import goodsinfo from './views/home/goods/goodslist/goodsinfo.vue'

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
    },
    {
      path: '/home/newsinfo/:id',
      component: newsinfo
    },
    {
      path: '/home/photolist',
      component: photolist
    },
    {
      path: '/home/photoinfo/:id',
      component: photoinfo
    },
    {
      path: '/home/goodslist',
      component: goodslist
    },
    {
      path: '/home/goodslist/:id',
      name: 'goodsinfo',
      component: goodsinfo
    }

  ]
})

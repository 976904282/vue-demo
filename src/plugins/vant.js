import Vue from 'vue'
import {
  Card,
  Grid, GridItem,
  Toast,
  Swipe, SwipeItem,
  Tabbar, TabbarItem,
  NavBar,
  Button
} from 'vant'

Vue
  .use(Card)
  .use(Grid).use(GridItem)
  .use(Swipe).use(SwipeItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Button)

Vue.prototype.$Toast = Toast

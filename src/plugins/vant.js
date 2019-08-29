import Vue from 'vue'
import {
  Stepper,
  Panel,
  ImagePreview,
  Lazyload,
  Tab, Tabs,
  Cell, CellGroup,
  Tag,
  Card,
  Grid, GridItem,
  Toast,
  Swipe, SwipeItem,
  Tabbar, TabbarItem,
  NavBar,
  Button
} from 'vant'

const options = {
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1566907154387&di=720d0878f186305d99807ce3fc503b50&imgtype=0&src=http%3A%2F%2Fimg1.doubanio.com%2Fview%2Fnote%2Fraw%2Fpublic%2Fp49097729.jpg'
}

Vue
  .use(Stepper)
  .use(Panel)
  .use(ImagePreview)
  .use(Lazyload, options)
  .use(Tab).use(Tabs)
  .use(Cell).use(CellGroup)
  .use(Tag)
  .use(Card)
  .use(Grid).use(GridItem)
  .use(Swipe).use(SwipeItem)
  .use(Tabbar)
  .use(TabbarItem)
  .use(NavBar)
  .use(Button)

Vue.prototype.$Toast = Toast
Vue.prototype.$ImagePreview = ImagePreview

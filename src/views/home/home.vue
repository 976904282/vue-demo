<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white" class="my-wipe">
      <van-swipe-item class="item" v-for="item in lunboList" :key="item.id">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3" class="mygrid">
      <van-grid-item v-for="grid in grids" :key="grid.id" :text="grid.title" props="grid" :to="grid.to"  >
        <template slot="icon">
          <img :src="grid.src" alt="">
      </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
export default {
  data: () => ({
    lunboList: [],
    grids: []
  }),
  created () {
    this.getlunbo()
    this.getGrids()
  },
  methods: {
    async getlunbo () {
      const {
        data: { message, status }
      } = await this.$http.get('api/getlunbo')
      if (status !== 0) return this.$Toast('获取轮播图失败')
      this.lunboList = message
    },
    async getGrids () {
      const {
        data: { message, status }
      } = await this.$http.get('api/grids')
      if (status !== 0) return this.$Toast('获取商品数据失败')
      this.grids = message
      console.log(message)
    }
  }
}
</script>
<style lang="less" scoped>
.my-wipe {
  height: 200px;
  .item {
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}

.mygrid{
  img{
    width:60px;
    height:60px;
    display:block;
  }
}
</style>

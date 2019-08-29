<template>
  <div class="goods-list">
    <div v-for="good in goods" :key="good.id" class="goods-item" @click="goTarget(good.id)">
      <img :src="good.img_url" alt />
      <h1 class="title">{{good.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{good.sell_price}}</span>
          <span class="old">￥{{good.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{good.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <!-- 加载更多 -->
    <van-button plain type="danger" class="more" @click="getMore">{{hasFlag?'没有更多了':'加载更多'}}</van-button>
  </div>
</template>
<script>
export default {
  data: () => ({
    pageindex: 0,
    goods: [],
    limit: 3,
    hasFlag: false
  }),
  created () {
    this.getGoods()
  },
  methods: {
    async getGoods () {
      if (this.hasFlag !== false) return
      this.pageindex++
      const {
        data: { message, status, count }
      } = await this.$http.get(`api/getgoods?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast(message)
      this.goods = this.goods.concat(message)
      this.hasFlag = this.pageindex * this.limit > count
    },
    getMore () {
      this.getGoods()
    },
    goTarget (id) {
      this.$router.push({ name: 'goodsinfo', params: { id } })
    }
  }
}
</script>
<style lang="less" scoped>
.goods-list {
  display: flex;
  padding: 7px;
  flex-wrap: wrap;
  justify-content: space-between;
  .goods-item {
    width: 48%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    box-sizing: border-box;
  }
  img {
    width: 100%;
  }
  .title {
    font-size: 14px;
    color: blue;
  }
  .info {
    p {
      margin: 0;
      padding: 5px;
    }
    .price {
      .now {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
        margin-left: 10px;
      }
    }
    .sell {
      background: #ccc;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
    }
  }
  .more {
    width: 100%;
  }
}
</style>

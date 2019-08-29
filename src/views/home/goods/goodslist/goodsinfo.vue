<template>
  <div class="goodsinfo">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="isShow" ref="ballRef" id="ball"></div>
    </transition>
    <div class="panel" style="width:360px;overflow:hidden">
      <van-swipe :autoplay="3000" indicator-color="white" class="my-swipe">
        <van-swipe-item class="item" v-for="thum in thums" :key="thum.id">
          <img :src="thum.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-panel :title="goodsinfo.title" class="panel">
      <div class="panel-body">
        <div class="price-group">
          市场价格:
          <span class="old">{{goodsinfo.market_price}}</span>
          销售价格:
          <span class="new">{{goodsinfo.sell_price}}</span>
        </div>

        <!-- 步进器 -->
        <div class="stepper">
          <div class="number">购买数量:</div>
          <van-stepper v-model="value" integer class="number" />
        </div>
        <div class="btn-group">
          <van-button type="primary" size="small" class="btn">立即购买</van-button>
          <van-button type="danger" size="small" class="btn" @click="addCart" :disabled="isDisable">加入购物车</van-button>
        </div>
      </div>
    </van-panel>

    <!-- 列表信息 -->
    <van-panel class="panel" title="商品信息">
      <div class="panel-body">
        <p>商品货号：{{ goodsinfo.goods_no }}</p>
        <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
        <p>上架时间：{{ goodsinfo.add_time | datefmt }}</p>
      </div>
    </van-panel>
  </div>

  <!-- 列表信息 -->
</template>
<script>
export default {
  data: () => ({
    id: '',
    thums: [],
    value: 1,
    goodsinfo: {},
    isShow: false,
    isDisable: false
  }),
  created () {
    this.id = this.$route.params.id
    this.getThumImages()
    this.getgoodsinfo()
  },
  methods: {
    async getThumImages () {
      let id = Number(this.id) + 100
      const {
        data: { status, message }
      } = await this.$http.get(`api/getthumimages/${id}`)
      if (status !== 0) return this.$Toast(message)
      //   console.log(message)
      this.thums = message
    },
    async getgoodsinfo () {
      const {
        data: { status, message }
      } = await this.$http.get('api/goods/getinfo/' + this.id)
      if (status !== 0) this.$Toast('获取商品信息失败')
      console.log(message)
      this.goodsinfo = message
    },
    getBound () {
      let ball = document.querySelector('#ball').getBoundingClientRect()
      let info = document.querySelector('.van-info').getBoundingClientRect()
      this.xDist = info.left - ball.left
      this.yDist = info.top - ball.top
    },
    addCart () {
      this.isShow = !this.isShow
      // 点击瞬间禁用按钮 节流效果
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 400)
      let goodsinfo = {
        id: this.$route.params.id,
        count: this.value,
        sell_price: this.goodsinfo.sell_price,
        selected: true,
        title: this.goodsinfo.title,
        src: this.thums[0].src,
        timer: null
      }
      this.$store.commit('addCart', goodsinfo)
    },
    beforeEnter (el) {
      el.style.transform = 'translate(0,0)'
    },
    enter (el, done) {
      // eslint-disable-next-line no-unused-expressions
      el.offsetLeft
      this.getBound()
      el.style.transform = `translate(${this.xDist}px,${this.yDist}px)`
      el.style.transition = 'all .3s ease'
      done()
    },
    afterEnter () {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.goodsinfo {
  position: relative;
  .ball {
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    z-index: 999;
    left: 147px;
    top: 240px;
  }
  .my-swipe {
    height: 150px;
    img {
      height: 100%;
      margin: 0 auto;
      display: block;
    }
  }
  .panel {
    width: 96%;
    margin: 0 auto;
    box-shadow: 0 0 3px #ccc;
    border-radius: 6px;
    margin-top: 10px;
    overflow: hidden;
    .panel-body {
      margin-left: 36px;
      margin-bottom: 10px;
      color: #8f8f94;
      font-size: 14px;
      .price-group {
        margin-bottom: 12px;
        .old {
          text-decoration: line-through;
          margin-right: 6px;
        }
      }
      .stepper {
        color: #8f8f94;
        font-size: 0;
        .number {
          display: inline-block;
          font-size: 14px;
          margin-right: 6px;
        }
      }
      .btn-group {
        margin-top: 10px;
        .btn:first-child {
          margin-right: 10px;
        }
      }
      p {
        margin-top: 10px;
      }
    }
  }
}
</style>

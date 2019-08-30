<template>
  <div class="cart">
    <div class="cart-group" v-for="(cart,index) in $store.state.cart" :key="cart.id">
      <div class="cart-s">
        <van-switch v-model="cart.selected" />
      </div>
      <div class="cart-p">
        <van-card
          :num="cart.count"
          :price="cart.sell_price"
          :title="cart.title"
          :thumb="cart.src"
          props="index"
        >
          <template slot="desc">
            <van-stepper
              v-model="cart.count"
              class="my-stepper"
              @plus="plus(index,cart.id)"
              ref="stepRef"
            />
          </template>
        </van-card>
      </div>
    </div>
    <van-submit-bar :price="$store.getters.getAllPrice.allPrice*100" button-text="提交订单" />
  </div>
</template>
<script>
export default {
  data: () => ({
  }),
  created () {},
  methods: {
    plus (index, id) {
      let value = this.$refs.stepRef[index].currentValue
      let arr = JSON.parse(localStorage.getItem('cart'))
      arr.some(item => {
        if (item.id === id) {
          item.count = value
          return true
        }
      })
      localStorage.setItem('cart', JSON.stringify(arr))
    }
  }
}
</script>
<style lang='less' scoped>
.cart {
  padding: 10px;
  .cart-group {
    padding: 4px;
    display: flex;
    align-items: center;
    border: 1px solid pink;
    margin-top: 10px;
    box-shadow: 1px 1px 1px pink;
    .cart-p {
      width: 100%;
      .my-stepper {
        margin: 10px 0 0 10px;
      }
    }
  }
  .van-submit-bar {
    position: relative;
    margin-top: 10px;
    border: 1px solid pink;
    box-sizing: border-box;
  }
}
</style>

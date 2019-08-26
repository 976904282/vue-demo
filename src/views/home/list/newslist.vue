<template>
  <div class="newslist">
    <van-card v-for="item in newslist" :key="item.id" :title="item.title" :thumb="item.img_url">
      <div slot="price">
        <span class="add_time">发表时间:{{item.add_time}}</span>
      </div>
      <div slot="num">点击{{item.click}}次</div>
    </van-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    newslist: []
  }),
  created () {
    this.getNewsList()
  },
  methods: {
    async getNewsList () {
      const {
        data: { message, status }
      } = await this.$http.get('api/getnewslist')
      if (status !== 0) return this.$Toast('获取新闻列表信息数据失败')
      this.newslist = message
      console.log(message)
    }
  }
}
</script>
<style lang="less" scoped>
.newslist {
  .van-card__thumb {
    height: 55px;
  }
  .van-card__content {
    min-height: 55px;
    .van-card__title {
      margin-bottom: 20px;
    }
    .add_time {
      color: red;
    }
  }
}
</style>

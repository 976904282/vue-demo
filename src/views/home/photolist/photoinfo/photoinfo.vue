<template>
  <div class="photoinfo">
    <van-card :title="imgs.title">
      <div slot="price">
        <span class="add_time">发表时间: {{imgs.add_time}}</span>
      </div>
      <div slot="num">点击{{imgs.click}}次</div>
    </van-card>
    <hr />
<div class="imgs-box">
    <div class="imgs-thum">
        <img :src="thum" alt="" v-for="(thum,index) in thums" :key="thum" @click="showImg(index)">
    </div>

    <p class="sesc">{{imgs.content}}</p>

      <!-- 评论组件 -->
    <comment :comments="comments" @postcomment="postcomment"></comment>
    <!-- 加载更多 -->
    <van-button plain type="danger" class="more" @click="getMore">{{hasFlag?'没有更多了':'加载更多'}}</van-button>
</div>

  </div>
</template>
<script>
import Comment from '@/components/comment'
export default {
  data: () => ({
    id: '',
    imgs: {},
    thums: [],
    pageindex: 1,
    limit: 4,
    comments: [],
    hasFlag: false
  }),
  created () {
    this.id = this.$route.params.id
    this.getImgs()
    this.getThumImages()
    this.getComments()
  },
  methods: {
    async getImgs () {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getimageInfo/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      this.imgs = message
      console.log(message)

      // console.log(message)
    },
    async getThumImages () {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getthumimages/${this.id}`)
      if (status !== 0) return this.$Toast(message)

      // 把对象中的图片存到一个新的数组
      let arr = []
      message.forEach(item => {
        if (item.src) {
          arr.push(item.src)
        }
      })
      this.thums = arr
    },
    showImg (startPosition) {
      this.$ImagePreview({
        images: this.thums,
        startPosition
      })
    },

    async getComments () {
      // 节流
      if (this.hasFlag !== false) return
      // this.pageindex++
      const {
        data: { message, status, count }
      } = await this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast(message)
      //  message 获取到某一页的数据
      this.comments = this.comments.concat(message)
      console.log(count)
      // 计算出一个布尔值 用于逻辑控制
      this.hasFlag = this.pageindex * this.limit > count
      console.log(this.comments)
      // console.log(this.hasFlag)
    },
    getMore () {
      this.pageindex++
      this.getComments()
    },
    async postcomment (data) {
      const {
        data: { message, status }
      } = await this.$http.post(`api/postcomment/${this.id}`, { content: data })
      if (status !== 0) return this.$Toast('发表评论失败')
      console.log(message)
      // 自己模拟一个数据添加到评论的首位达到页面刷新效果
      this.comments.unshift({
        user_name: '匿名用户',
        content: data,
        add_time: Date.now()
      })
    }
  },
  components: {
    Comment
  }
}
</script>
<style lang="less" scoped>
.photoinfo {
  padding: 0 4px;
  .van-card {
    background-color: #fff;
  }
  .van-card__thumb {
    height: 55px;
  }
  .van-card__content {
    min-height: 55px;
    .van-card__title {
      margin-bottom: 20px;
      text-align: center;
      color: red;
      font-size: 16px;
    }
    .add_time {
      color: #226aff;
    }
  }

  .more {
    width: 100%;
  }
  .imgs-thum{
      display:flex;
      justify-content: space-around;
      img{
          width:100px;
          height: 100px;
      }
  }
}
</style>

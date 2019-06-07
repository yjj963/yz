<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swp-page swiper-slide" v-for="list in lists">
        <a class="js-no-follow" :href="list.clickUrl">
          <img class="goods-main-photo fadeIn" :src="list.img">
        </a>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
// swiper对dom节点进行操作的，dom节点什么生成？mounted
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  // props: ['lists'],
  props: {
    lists: {
      type: Array,
      required: true
    },
    name: {}
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      new Swiper('.swiper-container', {
        autoplay: true,
        loop: true,
        pagination: {
          el:'.swiper-pagination'
        }
      })
    }
  },
  // watch: {
  //   lists(val,oldVal) {
  //     console.log(val,oldVal)
  //     console.log('before nextTick: ',document.querySelectorAll('.swiper-slide'))
  //     this.$nextTick(() => {//下一次数据更新完成，同时dom节点确定以后执行
  //       console.log('after nextTick: ',document.querySelectorAll('.swiper-slide'))
  //     })
  //   }
  // }
}
</script>

<style>
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>

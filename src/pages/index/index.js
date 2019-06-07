import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import Swipe from 'components/Swipe.vue'
import Foot from 'components/Foot.vue'

import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

Vue.config.productionTip = false

new Vue({
  el: '#vue-el',
  data: {
    pageNum: 1,
    pageSize: 6,
    lists: null,
    loading: false,
    allLoaded: false,
    bannerLists: null
  },
  created() {
    this.getLists()
    this.getBanner()
  },
  beforeMount(){
  },
  methods: {
    getLists() {
      if (this.allLoaded) return
      this.loading = true
      axios.get(url.hotLists, {
        params:{
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }).then(res => {
        let curLists = res.data.lists
        if(curLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          this.lists = this.lists.concat(curLists)
        } else {
          this.lists = curLists
        }
        this.loading = false
        this.pageNum+=1
      })
    },
    getBanner() {
      axios.get(url.banner).then(res => {
        this.bannerLists = res.data.lists
      })
    }
  },
  components: {
    Foot,
    Swipe
  },
  mixins:[mixin]
})
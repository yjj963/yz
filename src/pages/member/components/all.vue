<template>
  <div class="container " style="min-height: 597px;">
    <div v-for='list in lists'  v-if="lists&&lists.length" class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item"
        @click='toEdit(list)'
        :class="{'address-item-default':list.isDefault}"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
      </a>
    </div>
    <div class="block stick-bottom-row center">
      <router-link to='/address/form' class="btn btn-blue js-no-webview-block js-add-address-btn">
            新增地址
      </router-link>
    </div>
  </div>
</template>
<script>
import Address from 'js/addressService.js'
import url from 'js/api.js'
import axios from 'axios'

  export default {
    data(){
      return {
        lists:null,
      }
    },
    created(){
      axios.get(url.addressLists).then(res=>{
        this.lists=res.data.lists
      })
    },
    methods:{
      toEdit(list){
         this.$router.push({ path: '/address/form', query: { type: 'edit', instance: list } })
      }
    }
  }
</script>
<style scoped>
@import './address.css'
</style>
import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import mixin from 'js/mixin.js'
Vue.config.productionTip = false

new Vue({
    el:"#app",
    data:{
        topLists:null,
        topIndex:0,
        subData:null,
        rankData:null
    },
    created(){
        this.getTopList()
        this.getSubList(0)
    },
    methods:{
        //获取侧边栏
        getTopList(){
            axios.get(url.topList).then(res=>{
                this.topLists=res.data.lists
            })
        },
        //获取二级菜单的详情内容
        getSubList(index,id){
            this.topIndex=index
            if(index===0){
                this.getRank()
            }else{
                axios.get(url.subList,{params:{id}}).then(res=>{
                    console.log(res)
                    this.subData=res.data.data
                })
            }
            
        },
        //获取综合排行的详情内容
        getRank(){
            axios.get(url.rank).then(res=>{
                this.rankData=res.data.data
                console.log(res.data.data)
            })
        },
        toSearch(list){
            location.href=`search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    mixins:[mixin]
})

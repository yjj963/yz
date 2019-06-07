import "css/common.css"  
import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Swipe from 'components/Swipe.vue'

let {id}=qs.parse(location.search.substr(1))
new Vue({
    el:"#app",
    data:{
        details:null,
        detailTab:['商品详情','本店成交'],
        tabIndex:0,
        deal:null,
        swipeLists:[],
        skuType:1,
        showSku:false,//是否显示遮罩和弹框,
        skuNum:1,//购买数量
        isAddCart:false,//是否已经加入购物车，关系到购物车图标的显示、
        showAddMessage:false,//成功加入购物车的提示，
        id,
    },
    created(){
        this.getDetail()
    },
    methods:{
        getDetail(){
            axios.get(url.details,{params:{id}}).then(res=>{
                this.details=res.data.data
                this.details.imgs.forEach(item => {
                    this.swipeLists.push({
                      clickUrl: '',
                      img: item
                    })
                })
            })
        },
        getDeal(){
            axios.get(url.deal).then(res=>{
                this.deal=res.data.data.lists
                console.log(res.data.data.lists)
            })
        },
        changeTab(index){
            this.tabIndex=index
            if(index){
                this.getDeal()
            }
        },
        chooseSku(type){
            this.skuType=type
            this.showSku=true
        },
        changeSkuNum(num){
            /*****this.skuNum===1、 +=num*/
            if(num<0 && this.skuNum===1){return}
            this.skuNum+=num
        },
        addCart(){
            axios.post(url.addCart,{id,num:this.skuNum}).then(res=>{
                if(res.status===200){
                    this.showSku=false
                    this.isAddCart=true
                    this.showAddMessage=true
                    setTimeout(()=>{
                        this.showAddMessage=false
                    },1000)
                }
            })
        }
    },
    watch:{
        showSku(val,oldVal){
            document.body.style.overflow=val ? 'hidden' : 'auto'
            document.querySelector('html').style.overflow=val ? 'hidden' : 'auto'
            document.body.style.height=val ? '100%' : 'auto'
            document.querySelector('html').style.height=val ? '100%' : 'auto'
        }
    },
    mixins:[mixin],
    components:{
        Swipe
    }
})
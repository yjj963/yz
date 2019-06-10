import 'css/common.css'
import './cart.css'
import './cart_base.css'
import './cart_trade.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import fetch from 'js/fetch.js'
import Cart from 'js/cartService.js'
import mixin from 'js/mixin.js'
import Volecity from 'velocity-animate'

new Vue({
    el:'.container',
    data:{
        lists:null,
        editShop:null,
        editShopIndex:-1,
        total:0,
        removeData:null,
        removePopup:false,
        removeMsg:'',
        move:false,
    },
    computed:{
        allSelected:{
            get(){
                if(this.lists&&this.lists.length){
                    return this.lists.every(shop=>{
                        return shop.checked
                    })
                }
                return false
            },
            set(newVal){
                console.log(newVal)
                this.lists.forEach(shop=>{
                    shop.checked=newVal
                    shop.goodsList.forEach(good=>{
                        good.checked=newVal
                    })
                })
            }
        },
        allRemoveSelected:{
            get(){
                if(this.editShop){
                    return this.editShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editShop){
                    this.editShop.removeChecked=newVal
                    this.editShop.goodsList.forEach(good=>{
                        good.removeChecked=newVal
                    })
                }
            }
        },
        removeLists(){
            if(this.editShop){
                let arr=[]
                this.editShop.goodsList.forEach(good=>{
                    if(good.removeChecked){
                        arr.push(good)
                    }
                })
                return arr
            }
            return []
        },
        selectLists(){
            if(this.lists&& this.lists.length){
                let arr=[]
                let total=0
                this.lists.forEach(shop=>{
                    shop.goodsList.forEach(good=>{
                        if(good.checked){
                            arr.push(good)
                            total+=good.price*good.number
                        }
                    })
                })
                this.total=total
                return arr
            }
            return []
        }
    },
    created(){
        this.getLists()
    },
    methods:{
        getLists(){
            axios.get(url.cartLists).then(res=>{
                let lists=res.data.cartList
                lists.forEach(shop => {
                    shop.checked=true
                    shop.removeChecked=false
                    shop.editing=false
                    shop.editMsg='编辑'
                    shop.goodsList.forEach(good=>{
                        good.checked=true
                        good.removeChecked=false
                    })
                });
                this.lists=lists
            })
        },
        edit(shop,shopIndex){
            if(this.move){return false}
            shop.editing=!shop.editing
            if(shop.editing){
                shop.editMsg='完成'
                this.editShopIndex=shopIndex
                this.editShop=shop
            }else{
                shop.editMsg='编辑'
                this.editShop=null
                this.editShopIndex=-1
            }
        },
        selectShop(shop){
            let attr=shop.editing?'removeChecked':'checked'
            shop[attr]=!shop[attr]
            shop.goodsList.forEach(good=>{
                good[attr]=shop[attr]
            })
            console.log(this.allSelected)
        },
        selectGood(shop,good){
            let attr=shop.editing?'removeChecked':'checked'
            good[attr]=!good[attr]
            shop[attr]=shop.goodsList.every(good=>{
                return good[attr]
            })
        },
        selectAll(){
            let attr=this.editShop?'allRemoveSelected':'allSelected'
            this[attr]=!this[attr]
        },
        reduce(good){
            if(good.number===1) return
            Cart.reduce(good.id).then(res=>{
                good.number--
            })
        },
        add(good){
            Cart.add(good.id).then(res=>{console.log(res)
                good.number++
            })
        },
        removeConfirm(){
            this.removePopup=false
            if(this.removeMsg==="确定要删除该商品吗？"){
                let {shop,shopIndex,good,goodIndex}=this.removeData
                fetch(url.cartRemove,{id:good.id}).then(res=>{
                    shop.goodsList.splice(goodIndex,1)
                    if(!shop.goodsList.length){
                        this.lists.splice(shopIndex,1)
                    }
                })
            }else{
                let arr=this.removeLists
                fetch(url.cartMremove,{arr}).then(res=>{
                    this.lists.splice(this.editShopIndex,1)
                }) 
            }
        },
        //删除单个
        remove(shop,shopIndex,good,goodIndex){
            this.removeData={shop,shopIndex,good,goodIndex}
            this.removePopup=true
            this.removeMsg="确定要删除该商品吗？"
        },
        //删除多个
        removeList(){
            this.removePopup=true
            this.removeMsg=`确定要删除这${this.removeLists.length}个商品吗？`
        },
        start(e,good){
            //记录起点 e.changedTouches[0].clientX
            good.startX=e.changedTouches[0].clientX
        },
        end(e,shop,shopIndex,good,goodIndex){
            if(shop.editing){return false}
            //算一下移动的距离>10,切换到编辑样式
            //this.editing=true
            let endX=e.changedTouches[0].clientX
            let left='0'
            if(good.startX-endX>100){
                left='-60px'
                this.move=true
            }
            if(endX-good.startX>100){
                left='0px'
                this.move=false
            }
            Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`], {
                left
              })
        }
    }
})
import Foot from 'components/Foot'
let mixin={
    components:{
        Foot
    },
    filters:{
        currency(price){
            let priceStr=''+price
            if(priceStr.indexOf('.')>-1){
                let arr=priceStr.split('.')
                return arr[0]+'.'+(arr[1]+'0').substr(0,2)
            }else{
                return price+'00'
            }
        }
    }
}
export default mixin
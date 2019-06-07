import Foot from 'components/Foot'
let mixin={
    components:{
        Foot
    },
    filters:{
        currency(price){
            if(price%1===0){
                 price=price+".00"  
            }else{
                price=price+"0" 
            }
            return price
        }
    }
}
export default mixin
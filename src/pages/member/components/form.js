import Address from 'js/addressService.js'
import { mapState } from 'vuex'

export default {
    data(){
        return {
            name:'',
            tel:'',
            provinceValue:-1,
            cityValue:-1,
            districtValue:-1,
            address:'',
            id:'',
            isDefault:false,
            addressData:require('js/address.json'),
            provinceList:null,
            cityList:null,
            districtList:null,
            isInitVal:false
        }
    },
    computed: {
        ...mapState({
          lists: state => state.lists
        })
      },
    created(){
        if(this.$route.query.type==='edit'){
            let ad=this.$route.query.instance
            this.name=ad.name
            this.tel=ad.tel
            this.address=ad.address
            this.id=ad.id
            this.provinceValue=parseInt(ad.provinceValue)
            this.isInitVal = true
            this.isDefault = ad.isDefault
        }
    },
    methods:{
        add(){
            let {name,tel,provinceValue,cityValue,districtValue,address,id}=this
            let data={name,tel,provinceValue,cityValue,districtValue,address,id}
            if(this.$route.query.type==='edit'){
                data.id = this.id
                data.isDefault = this.isDefault
                this.$store.dispatch('updateAction', data)
            }else{
                this.$store.dispatch('addAction', data)
            }
        },
        remove(){
            if(window.confirm()){
                this.$store.dispatch('removeAction', this.id)
            }
        },
        setDefault(){
            Address.setDefault(this.id).then(res => {
                this.$store.dispatch('setDefaultAction', this.id)
            })
        }
    },
    watch:{
        lists: {
            handler() {
              this.$router.go(-1)
            },
            deep: true//深度监听，可以监听到修改默认值
          },
        provinceValue(val){
            if(val===-1) return
            let index = this.addressData.list.findIndex(item => {
                return item.value === val
              })
              this.cityList = this.addressData.list[index].children
              this.cityValue = -1
              this.districtValue = -1
              if (this.type === 'edit' && this.isInitVal) {
                this.cityValue = parseInt(this.instance.cityValue)
              }
        },
        cityValue(val) {
            if (val === -1) return
            let index = this.cityList.findIndex(item => {
              return item.value === val
            })
            this.districtList = this.cityList[index].children
            this.districtValue = -1
            if (this.type === 'edit' && this.isInitVal) {
              this.districtValue = parseInt(this.instance.districtValue)
              this.isInitVal = false
            }
          }
    }
}

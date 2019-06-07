let url = {
  hotLists: '/index/hotLists',
  banner: '/index/banner',
  subList: '/category/subList',
  topList: '/category/topList',
  rank: '/category/rank',
  searchList: '/search/list',
  details:'/goods/details',
  deal:'/goods/deal',
  addCart:'/cart/add',
  cartLists: '/cart/list',
  cartRemove: '/cart/remove',
  cartMremove: '/cart/mremove',
  cartReduce: '/cart/reduce',
  cartUpdate: '/cart/update',
  addressLists: '/address/list',
  addressAdd: '/address/add',
  addressRemove: '/address/remove',
  addressUpdate: '/address/update',
  addressSetDefault: '/address/setDefault'
}
//http://rapapi.org/mockjsdata/23334
//http://rap2api.taobao.org/app/mock/7058
let host = 'https://www.easy-mock.com/mock/5cf8817299d46835310f989d/yz'

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
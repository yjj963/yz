// 使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressService.js'
import axios from 'axios'
import url from 'js/api.js'

// 创建Store实例
const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state, lists) {
      state.lists = lists
    },
    add(state, instance) {
      state.lists.push(instance)
    },
    remove(state, id) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id == id
      })
      lists.splice(index, 1)
    },
    update(state, instance) {
      //进行深复制，不然监听不到
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id == instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault(state, id) {
      let lists = state.lists
      lists.forEach(item => {
        item.isDefault = item.id == id ? true:false
      })
    }
  },
  actions: {
    getLists({commit}) {
      axios.get(url.addressLists).then(res => {
        commit('init', res.data.lists)
        console.log(res)
      })
    },
    addAction({commit}, instance) {
      Address.add(instance).then(res => {
        commit('add', instance)
        console.log(instance)
      })
    },
    removeAction({commit}, id) {
      Address.remove(id).then(res => {
        commit('remove', id)
      })
    },
    updateAction({commit}, instance) {
      Address.update(instance).then(res => {
        // 实际开发使用后台返回的数据
        // commit('update', res.data.data)
        // 测试使用
        console.log(instance)
        let data = res.data
        data.id = instance.id
        data.isDefault = instance.isDefault
        console.log(data)
        commit('update', instance)
      })
    },
    setDefaultAction({commit}, id) {
      Address.setDefault(id).then(res => {
        commit('setDefault', id)
      })
    }
  }
})

export default store
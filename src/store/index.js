import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage.js'
Vue.use(Vuex)
//设定常量
const TOKEN_KEY='TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    //一个对象，存储当前登录的用户信息
    // user:JSON.parse(localStorage.getItem(TOKEN_KEY))
    user:getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state,data){
      state.user=data
      //为了防止刷新丢失数据我们需要把它存储到本地
      // localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
      setItem(TOKEN_KEY,state.user)
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  }
})

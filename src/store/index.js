import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const initState = {
  // token 的信息对象
  tokenInfo: {}
}
const stateStr = localStorage.getItem('state')

if (stateStr) {
  // 加载本地的数据
  initState.tokenInfo = JSON.parse(stateStr)
}

export default new Vuex.Store({
  state: {
    // 用来存储 token 信息的对象，将来这个对象中会包含两个属性 { token, refresh_token }
    state: initState
  },
  mutations: {
    updateTokenInfo (state, payload) {
      // 把提交过来的 payload 对象，作为 tokenInfo 的值
      state.tokenInfo = payload
      // 如果希望在 Mutation A 中调用 Mutation B，需要通过 this.commit() 方法来实现
      // this 表示当前的 new 出来的 store 实例对象
      this.commit('saveStateToStorage')
      // 测试 state 中是否有数据
      console.log(state)
    },
    // 今后，只要 tokenInfo 对象被更新了，就可以调用 saveStateToStorage 方法，把最新的 state 持久化存储到本地：将 state 持久化存储到本地
    saveStateToStorage (state) {
      localStorage.setItem('state', JSON.stringify(state))
    }
  },
  actions: {},
  modules: {}
})

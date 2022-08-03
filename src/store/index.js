import { createStore } from 'vuex'
import createPersistentStore from 'vuex-persistedstate'

// 三个模块
import cart from './modules/catr'
import user from './modules/user'
import category from './modules/category'

export default createStore({
  modules: {
    cart,
    user,
    category
  },
  // 配置vuex持久化插件
  plugins: [
    createPersistentStore({
      // 本地存储的名字
      key: 'erabbit-client-pc-store',
      // 指定存储的木块
      paths: ['user', 'cart']
    })
  ]
})

// 分类模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'

export default {
  namespaced: true,
  state () {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 修改分类
  mutations: {
    // payload 所有分类的集合
    setList (state, headCategory) {
      state.list = headCategory
    },
    // 修改当前一级分类下的open数据为true
    show (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, item) {
      const category = state.list.find(category => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const { result } = await findAllCategory()
      // 给一级分类加上一个控制二级分类显示隐藏的数据open
      result.forEach(item => {
        item.open = false
      })
      // 修改分类数据
      commit('setList', result)
    }
  }
}

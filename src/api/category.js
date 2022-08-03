// 定义分类相关api接口
import request from '@/utils/request'

/**
 *  获取所有分类
 * @returns Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

/**
 *  获取品牌
 * @returns Promise
 */
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
/**
 * 一级类目-PC
 * @param {*} id 一级类目ID
 * @returns
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id: id })
}
/**
 *二级类目-筛选条件-PC
 * @param { Number } id 二级分类ID
 * @returns Promise
 */
export const findSubFilter = (id) => {
  return request('/category/sub/filter', 'get', { id: id })
}
/**
 * 商品列表--分页查询
 * @param {  }
 * @returns Promise
 */
export const findCategoryGoods = (data) => {
  return request('/category/goods', 'POST', data)
}
/**
 * 获取分类下的商品（带筛选条件）
 * @param {Object} params - 可参考接口文档
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}

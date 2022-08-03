// 定义分类相关api接口
import request from '@/utils/request'

/**
 * 首页-广告区域(pc-小程序)
 * @param {*} distributionSite 广告区域展示位置（投放位置 投放位置，1为首页，2为分类商品页） 默认是1
 * @returns
 */
export const findBanner = (distributionSite = 2) => {
  return request('/home/banner', 'get', { distributionSite })
}
/**
 * 首页-新鲜好物
 * @param {*} limit 默认值为 4，指定响应数据中商品的数量
 * @returns
 */
export const findNew = (limit = 4) => {
  return request('/home/new', 'get', { limit })
}
/**
 * 首页-人气推荐
 * @param {*} 无请求参数
 * @returns
 */
export const findHot = () => {
  return request('/home/hot', 'get')
}
/**
 * 获取品牌
 * @param {Integer} limit - 品牌个数
 * @returns Promise
 */
export const findBrand = (limit = 5) => {
  return request('/home/brand', 'get', { limit })
}

/**
 * 获取商品板块
 * @returns Promise
 */
export const findGoods = () => {
  return request('/home/goods', 'get')
}
/**
 * 获取最新专题
 * @returns Promise
 */
export const findSpecial = () => {
  return request('/home/special', 'get')
}

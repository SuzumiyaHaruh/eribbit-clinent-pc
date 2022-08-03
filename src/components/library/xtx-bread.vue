// 封装面包屑
<script>
import { h } from 'vue'

export default {
  name: 'xtx-bread',
  render () {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建bread-crumbs父容器
    // 2. 获取默认插槽内容
    // 3. 去除bread-crumbs-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再bread-crumbs标签中
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      dymanicItems.push(item)
      if (i < (items.length - 1)) {
        dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'bread-crumbs' }, dymanicItems)
  }
}
</script>

<style lang='less'>
// 将scope属性去除，目的是为了样式穿透至item组件中
.bread-crumbs {
  display: flex;
  padding: 25px 10px;

  &-item {
    a {
      text-decoration: none;
      color: #666;
      transition: all .4s;

      &:hover {
        color: #27ba9b;
      }
    }
  }

  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
    // 样式的方式，不合理
    // &:last-child {
    //   display: none;
    // }
  }
}
</style>

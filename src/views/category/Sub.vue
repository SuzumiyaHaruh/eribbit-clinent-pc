<template>
  <Transition name="fade">
    <div class='sub-category' v-if="subFilter">
      <div class="container">
        <!-- 面包屑 -->
        <sub-bread/>
        <!-- 筛选分区 -->
        <sub-filter/>
      </div>
    </div>
    <sub-skeleton v-else></sub-skeleton>
  </Transition>
  <!-- 商品分区 -->
  <div class="goods-list container">
    <!-- 排序 -->
    <sub-sort/>
    <!-- 商品列表 -->
    <ul class="list">
      <li v-for="item in list" :key="item.id">
        <goods-item :goods="item"/>
      </li>
    </ul>
    <!--    加载-->
    <xtx-infinite-loading :loading="loading" :finished="finished" @load="onLoad"/>
  </div>
</template>

<script>
import SubBread from '@/views/category/components/SubBread'
import SubFilter from '@/views/category/components/SubFilter'
import { useRoute } from 'vue-router'
import { provide, reactive, ref, watch } from 'vue'
import { findCategoryGoods, findSubFilter } from '@/api/category'
import SubSkeleton from '@/views/category/components/SubSkeleton'
import SubSort from '@/views/category/components/SubSort'
import GoodsItem from '@/views/category/components/GoodsItem'
import XtxInfiniteLoading from '@/components/library/xtx-infinite-loading'

export default {
  name: 'Sub',
  components: {
    XtxInfiniteLoading,
    GoodsItem,
    SubSort,
    SubSkeleton,
    SubFilter,
    SubBread
  },
  setup () {
    const route = useRoute()
    const subFilter = ref(null)
    const list = ref([])
    // 用于商品列表--分页查询接口的请求参数
    const reqParams = reactive({
      categoryId: '',
      sortField: undefined, // 排序字段
      sortMethod: undefined, // 排序方法
      inventory: false, // 存货
      onlyDiscount: false // 只有折扣
    })
    // 页码独立维护
    const page = ref(1)
    // 加载中状态
    const finished = ref(false)
    // 加载结束状态
    const loading = ref(false)
    // watch监听id发生变化，需要重新发送请求
    watch(() => route.params.id, async (id) => {
      // 如果不是二级分类页面，就不发送请求
      if (route.path !== `/category/sub/${id}`) return
      // 💥 分类id为必传参数，当二级分类 id 有变化，请求参数也需要更新
      reqParams.categoryId = id
      // 发送请求接口调用
      const { result } = await findSubFilter(id)
      subFilter.value = await result
    }, { immediate: true })// 🔔 立刻执行一次，变化的时候再发送请求

    watch(reqParams, async () => {
      // 重置加载结束状态
      finished.value = false
      // 重置页码
      page.value = 1
      // 根据请求参数获取商品列表
      const { result } = await findCategoryGoods({
        ...reqParams,
        page: page.value
      })
      // 💥 注意：items 才是商品列表数组部分
      list.value = await result.items
      // console.log(list.value)
    }, { immediate: true })

    // 自定义加载事件，加载分页数据
    const onLoad = async () => {
      // 请求前 - 显示加载中
      loading.value = true
      // 页码要加1
      page.value++
      // 请求中 - 发送请求加载数据
      const { result } = await findCategoryGoods({
        ...reqParams,
        page: page.value
      })
      // 请求完成 - 隐藏加载中
      loading.value = false
      // 💥加载更多是数据的追加，注意展开后再追加，否则就是数组内嵌套数组了
      list.value.push(...result.items)
      // 判断数据是否已经加载完毕，如果加载完毕就 finished 设置为 true
      if (result.items.length < reqParams.pageSize) {
        finished.value = true
      }
    }
    // console.log(subFilter)
    // 🎉提供数据：provide('key', value)
    // 🎉获取数据：const value = inject('key')
    provide('subFilter', subFilter)
    // 父组件提供的是响应式对象，子组件内部可以直接修改
    provide('reqParams', reqParams)
    // 返回给模板绑定的数据-注意书写位置
    return {
      subFilter,
      list,
      finished,
      loading,
      onLoad
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;

  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;

    li {
      margin-right: 20px;
      margin-bottom: 20px;

      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>

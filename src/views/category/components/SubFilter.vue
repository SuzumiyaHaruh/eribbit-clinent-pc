<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="item in list" :key="item.id">
      <div class="head">{{item.name}}：</div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a href="javascript:;" v-for="i in item.properties" :key="i.id">{{i.name}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'

export default {
  name: 'SubFilter',
  setup () {
    // 获取父组件的数据
    const subFilter = inject('subFilter')
    // 🔔 筛选区的列表数据其实包含两部分：品牌数据 + 销售规格
    const list = computed(() => {
      return [
        // 品牌数据 - 参考销售规格的格式组装数据
        {
          id: 'brands',
          name: '品牌',
          properties: subFilter.value.brands
        },
        // 销售规格 - 已这个格式为主要
        ...subFilter.value.saleProperties
      ]
    })
    // 最后返回 computed 计算函数处理后的列表数据
    return { list }
  }
}
</script>

<style lang="less" scoped>
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;

  .item {
    display: flex;
    line-height: 40px;

    .head {
      width: 80px;
      color: #999;
    }

    .body {
      flex: 1;

      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;

        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
